import connection from '../database/database';
import { NewTagQuestionRelation } from '../interfaces/tagInterface';

async function createTag(newTag: string) {
    const result = await connection.query('INSERT INTO tags (name) VALUES ($1) RETURNING *;', [newTag]);

    return result.rows[0];
}

async function getTag(tag: string) {
    const result = await connection.query('SELECT * FROM tags WHERE name = $1', [tag]);

    return result.rows[0];
}

async function createTagQuestionRelation(newQuestionTag: NewTagQuestionRelation) {
    const {
        questionId,
        tagId,
    } = newQuestionTag;

    await connection.query('INSERT INTO question_tags (question_id, tag_id) VALUES ($1, $2)', [questionId, tagId]);
}

async function getTagRelation(questionId: number) {
    const result = await connection.query(`
    SELECT 
        tags.name
    FROM
        question_tags
    JOIN
        tags
    ON
        question_tags.tag_id = tags.id
    WHERE
        question_tags.question_id = $1
    ;`, [questionId]);

    return result.rows;
}

export {
    createTag,
    getTag,
    createTagQuestionRelation,
    getTagRelation,
};
