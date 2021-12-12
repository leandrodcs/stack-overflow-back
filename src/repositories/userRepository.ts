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

export {
    createUser,
    findUserByToken,
};
