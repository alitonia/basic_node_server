const {Pool} = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
  user: 'user',
  password: 'pass',
  database: 'db',
});

module.exports = pool;