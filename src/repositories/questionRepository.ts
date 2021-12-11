import dayjs from 'dayjs';
import connection from '../database/database';
import { NewAnswerInfoDB } from '../interfaces/answerInterface';
import { NewQuestion, QuestionId } from '../interfaces/questionInterface';
import 'dayjs/locale/pt-br.js';

async function createQuestion(questionBody: NewQuestion): Promise<QuestionId> {
    const {
        question,
        student,
        className,
    } = questionBody;

    const result = await connection.query(`
    INSERT INTO
        questions
        (question, posted_by, class, submited_at)
    VALUES
        ($1, $2, $3, $4)
    RETURNING
        id
    ;`, [question, student, className, dayjs().format('DD/MM/YYYY HH:mm')]);

    return result.rows[0];
}

async function answerQuestion(newAnswerInfoDB: NewAnswerInfoDB) {
    const {
        answeredById,
        answer,
        id,
    } = newAnswerInfoDB;

    await connection.query(`
    UPDATE
        questions
    SET
        answered = $1,
        answered_at = $2,
        answered_by = $3,
        answer = $4
    WHERE
        id = $5
    ;`, [true, dayjs().format('DD/MM/YYYY HH:mm'), answeredById, answer, id]);
}

async function getQuestions(questionId: QuestionId) {
    let query = 'SELECT * FROM questions';
    const queryArr = [];
    if (questionId.id) {
        query += ' WHERE id = $1;';
        queryArr.push(questionId.id);
    }
    if (!questionId.id) {
        query += ' WHERE answered = false ORDER BY id';
    }

    const result = await connection.query(query, queryArr);

    return result.rows;
}

export {
    createQuestion,
    answerQuestion,
    getQuestions,
};
