import connection from '../database/database';

async function createClass(className: string): Promise<number> {
    const result = await connection.query('INSERT INTO classes (name) VALUES ($1) RETURNING id;', [className]);

    return result.rows[0];
}

async function getClass(className: string) {
    const result = await connection.query('SELECT * FROM classes WHERE name = $1', [className]);

    return result.rows[0];
}

export {
    createClass,
    getClass,
};
