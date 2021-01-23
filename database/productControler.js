const pool = require('./connect_database.js');

module.exports.findAll = (req, res) => {
  const sql = 'SELECT * FROM hello;';
  pool.query(sql, (err, response) => res.send(response?.rows??'' + err?.toString() ?? ''));
};
