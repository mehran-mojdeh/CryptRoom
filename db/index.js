const { Pool, Client } = require('pg');
require('dotenv').config();

const {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_URL
} = process.env

let pool;
if(DATABASE_URL) {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: true
  });
}
else {
  pool = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_NAME,
    ssl: true
  });
  pool.connect();
}

module.exports = pool;