/* eslint-disable no-await-in-loop */
import { NewQuestion } from '../interfaces/questionInterface';
import * as tagRepository from '../repositories/tagsRepository';
import * as questionRepository from '../repositories/questionRepository';

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

export {
    postQuestion,
};
