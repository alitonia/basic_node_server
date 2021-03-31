const {Pool} = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

module.exports = pool;