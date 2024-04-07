import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

var db_config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "studentdb",
    port: process.env.DB_PORT || 8889
}

export const conn = mysql.createConnection(db_config);