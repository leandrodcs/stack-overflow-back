import connection from '../database/database';

async function createUser(name: string, classId: number) {
    const result = await connection.query('INSERT INTO users (name, class_id) VALUES ($1, $2) RETURNING *;', [name, classId]);

    return result.rows[0];
}

async function findUserByToken(token: string) {
    const result = await connection.query(`
    SELECT
        users.id AS id
    FROM
        sessions
    JOIN
        users
    ON
        sessions.user_id = users.id
    WHERE
        token = $1
    ;`, [token]);

    return result.rows[0];
}

async function getMostActiveUsers() {
    const result = await connection.query(`
    SELECT 
        users.name, count(questions.answered_by) as answers 
    FROM 
        questions 
    JOIN 
        users ON questions.answered_by = users.id  
    GROUP BY 
        questions.answered_by, users.name 
    ORDER BY 
        answers DESC LIMIT 10
    ;`);

    return result.rows;
}

export {
    createUser,
    findUserByToken,
    getMostActiveUsers,
};
