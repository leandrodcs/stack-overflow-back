/* eslint-disable no-await-in-loop */
import { NewQuestion } from '../interfaces/questionInterface';
import * as tagRepository from '../repositories/tagsRepository';
import * as questionRepository from '../repositories/questionRepository';
import * as userRepository from '../repositories/userRepository';
import { NewAnswerInfo } from '../interfaces/answerInterface';
import NotFoundError from '../errors/notFoundError';
import AlreadyAnsweredError from '../errors/alreadyAnsweredError';

async function postQuestion(questionBody: NewQuestion) {
    const { tags } = questionBody;

    const createdQuestion = await questionRepository.createQuestion(questionBody);

    const newTags = tags.split(', ');

    for (let i = 0; i < newTags.length; i++) {
        let tagExists = await tagRepository.getTag(newTags[i]);

        if (!tagExists) {
            tagExists = await tagRepository.createTag(newTags[i]);
        }
        await tagRepository.createTagQuestionRelation({ questionId: createdQuestion.id, tagId: tagExists.id });
    }
    return createdQuestion;
}

async function answerQuestion(newAnswerInfo: NewAnswerInfo) {
    const {
        answer,
        token,
        id,
    } = newAnswerInfo;

    const user = await userRepository.findUserByToken(token);

    const questionToBeAnswered = await questionRepository.getQuestions({ id });

    if (!questionToBeAnswered.length) {
        throw new NotFoundError(`A pergunta de id ${id} não existe.`);
    }
    if (questionToBeAnswered[0].answered) {
        throw new AlreadyAnsweredError(`A pergunta de id ${id} já foi respondida.`);
    }

    await questionRepository.answerQuestion({ answeredById: user.id, answer, id });
}

async function listQuestions() {
    const questions = await questionRepository.getQuestions({});
    const formatedQuestions = questions.map((q) => ({
        id: q.id,
        question: q.question,
        student: q.posted_by,
        class: q.class,
        submitedAt: q.submited_at,
        score: q.score,
    }));

    return formatedQuestions;
}

async function getQuestion(id: number) {
    let questions = await questionRepository.getQuestions({ id });

    if (!questions.length) {
        throw new NotFoundError(`A pergunta de id ${id} não existe.`);
    }

    const questionTags = await tagRepository.getTagRelation(id);
    const tagsArr = questionTags.map((q) => q.name);
    const tags = tagsArr.join(', ');

    const unansweredQuestion = {
        question: questions[0].question,
        student: questions[0].posted_by,
        class: questions[0].class,
        tags,
        answered: questions[0].answered,
        submitedAt: questions[0].submited_at,
        score: questions[0].score,
    };

    if (questions[0].answered) {
        questions = await questionRepository.getQuestions({ id, answered: true });
        const answeredQuestion = {
            ...unansweredQuestion,
            answeredAt: questions[0].answered_at,
            answeredBy: questions[0].name,
            answer: questions[0].answer,
        };

        return answeredQuestion;
    }

    return unansweredQuestion;
}

async function voteQuestion(id: number, vote: string) {
    const questions = await questionRepository.getQuestions({ id });

    if (!questions.length) {
        throw new NotFoundError(`A pergunta de id ${id} não existe.`);
    }

    let newScore;

    if (vote === 'up') {
        newScore = questions[0].score + 1;
    }
    if (vote === 'down') {
        newScore = questions[0].score - 1;
    }

    await questionRepository.updateScore(id, newScore);

    return `A pontuação da pergunta de id ${id} mudou de ${questions[0].score} para ${newScore}`;
}

export {
    postQuestion,
    answerQuestion,
    listQuestions,
    getQuestion,
    voteQuestion,
};
