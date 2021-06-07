const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {id} = query ?? {}
    return `SELECT *
            FROM categories
            WHERE id = ${id};`
};

module.exports.findCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    pool.query(sql_select_all(req.params),
        (err, response) => {
            if (err || !response || response.rows.length === 0) {
                res.status(404)
                return res.send({error: 'Page not found'})
            } else {
                return res.send(response?.rows)
            }
        }
    );
};
