const pool = require('../connect_database.js');

const sql_select_all = (query) => {
    const {id} = query ?? {}
    return `SELECT * FROM products WHERE id = ${id};`
};

module.exports.find = (req, res) => {
    pool.query(sql_select_all(req.params),
        (err, response) => {
            res.send(response?.rows)
        }
    );
};
