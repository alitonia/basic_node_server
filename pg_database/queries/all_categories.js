const pool = require('./connect_database.js');

const sql_select_all = 'SELECT * FROM categories LIMIT 20;';

module.exports.findAll = (req, res) => {
  pool.query(sql_select_all, (err, response) => res.send(response?.rows ?? 'What'));
};
