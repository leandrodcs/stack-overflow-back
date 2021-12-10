import connection from '../database/database';

async function createSession(userId: number, token: string) {
    const result = await connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2) RETURNING token;', [userId, token]);

    return result.rows[0];
}

export {
    // eslint-disable-next-line import/prefer-default-export
    createSession,
};
