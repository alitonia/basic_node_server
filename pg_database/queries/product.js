const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {id} = query ?? {}
    return `SELECT *
            FROM products
            WHERE id = ${id} and available != false;`
};

module.exports.find = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    pool.query(sql_select_all(req.params),
        (err, response) => {
            res.send(response?.rows)
        }
    );
};
