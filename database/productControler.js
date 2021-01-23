const pool = require('./connect_database.js');

module.exports.findAll = (req, res) => {
  const sql = 'SELECT * FROM products;';
  pool.query(sql, (err, response) => res.send(response?.rows ?? 'What'));
};
