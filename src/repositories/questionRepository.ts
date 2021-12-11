import connection from '../database/database';
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

export {
    createQuestion,
};
