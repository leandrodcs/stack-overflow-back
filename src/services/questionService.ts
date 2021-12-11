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

    const questionToBeAnswered = await questionRepository.checkQuestion(id);

    if (!questionToBeAnswered) {
        throw new NotFoundError(`A pergunta de id ${id} não existe.`);
    }
    if (questionToBeAnswered.answered) {
        throw new AlreadyAnsweredError(`A pergunta de id ${id} já foi respondida.`);
    }

    await questionRepository.answerQuestion({ answeredById: user.id, answer, id });
}

async function listQuestions() {
    const questions = await questionRepository.listQuestions();
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

export {
    postQuestion,
    answerQuestion,
    listQuestions,
};
