import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

class Database {
    constructor() {
        this.pool = mysql.createPool(config);
    }

    async getConnection() {
        return await this.pool.getConnection();
    }

    async query(sql, params) {
        const connection = await this.getConnection();
        try {
            const [rows] = await connection.query(sql, params);
            return rows;
        } finally {
            connection.release();
        }
    }

    async close() {
        await this.pool.end();
    }
}

export default new Database();
