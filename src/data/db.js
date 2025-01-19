import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'serverDBPG',
    password: '12345678',
    port: 5432,
});