const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {limit = 20, offset = 0, parent_category = null, is_short = false} = query ?? {}

    if (is_short) {
        return (
            `SELECT id
             FROM categories;
            `
        )
    }

    return (
        `SELECT *
         FROM categories `
        + ((parent_category !== null) ? `where parent_category = ${parent_category}` : '')
        + ` LIMIT ${limit} OFFSET ${offset} ;`
    )
};

module.exports.getAllCategories = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        console.log(req.body)
        // const query = req.query
        // const {is_short = false} = query || {}
        // const result = await pool.query(sql_select_all(query))
        res.send({status: 'OK'})
    } catch (e) {
        console.warn(e)
        res.status(501)
        res.send({error: e.toString()})
    }
};
