import connection from '../database/database';
import { NewAnswerInfoDB } from '../interfaces/answerInterface';
import { NewQuestion, ReturnedQuestion } from '../interfaces/questionInterface';

async function createQuestion(questionBody: NewQuestion): Promise<ReturnedQuestion> {
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
    ;`, [question, student, className, new Date()]);

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
    ;`, [true, new Date(), answeredById, answer, id]);
}

async function checkQuestion(id: number) {
    const result = await connection.query('SELECT * FROM questions WHERE id = $1', [id]);

    return result.rows[0];
}

async function listQuestions() {
    const result = await connection.query(`
    SELECT
        id,
        question,
        posted_by AS student,
        class,
        answered,
        submited_at as "submitedAt"
    FROM
        questions
    WHERE
        answered = false
    ORDER BY
        id
    ;`);

    return result.rows;
}

export {
    createQuestion,
    answerQuestion,
    checkQuestion,
    listQuestions,
};
