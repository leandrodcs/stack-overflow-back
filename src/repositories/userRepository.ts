import connection from '../database/database';

async function createUser(name: string, classId: number) {
    const result = await connection.query('INSERT INTO users (name, class_id) VALUES ($1, $2) RETURNING *;', [name, classId]);

    return result.rows[0];
}

export {
    // eslint-disable-next-line import/prefer-default-export
    createUser,
};
