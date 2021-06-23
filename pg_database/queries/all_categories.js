const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {limit = 20, offset = 0, parent_category = null} = query ?? {}
    return (
        `SELECT *
         FROM categories `
        + ((parent_category !== null) ? `where parent_category = ${parent_category}` : '')
        + ` LIMIT ${limit} OFFSET ${offset} ;`
    )
};

module.exports.findAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: 'Invalid request'});
    }

    pool.query(sql_select_all(req.query),
        (err, response) => res.send(response?.rows)
    );
};
