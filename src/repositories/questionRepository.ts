import dayjs from 'dayjs';
import connection from '../database/database';
import { NewAnswerInfoDB } from '../interfaces/answerInterface';
import { NewQuestion, ReturnedQuestion, SearchQuestion } from '../interfaces/questionInterface';
import 'dayjs/locale/pt-br.js';

async function createQuestion(questionBody: NewQuestion): Promise<SearchQuestion> {
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

async function getQuestions(questionInfo: SearchQuestion): Promise<ReturnedQuestion[]> {
    let query = 'SELECT * FROM questions';
    const queryArr = [];
    if (questionInfo.id && !questionInfo.answered) {
        query += ' WHERE id = $1';
        queryArr.push(questionInfo.id);
    }
    if (questionInfo.id && questionInfo.answered) {
        query += ' JOIN users ON questions.answered_by = users.id WHERE questions.id = $1;';
        queryArr.push(questionInfo.id);
    }
    if (!questionInfo.id) {
        query += ' WHERE answered = false ORDER BY id';
    }

    const result = await connection.query(query, queryArr);

    return result.rows;
}

async function updateScore(id: number, newScore: number) {
    await connection.query(`
        UPDATE
            recommendations
        SET
            score = $1
        WHERE
            id = $2
    ;`, [newScore, id]);
}

export {
    createQuestion,
    answerQuestion,
    getQuestions,
    updateScore,
};
