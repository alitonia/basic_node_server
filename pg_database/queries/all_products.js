const pool = require('../connect_database.js');

const sql_select_all = (query) => {
    const {limit = 20, offset = 0, category_id = null} = query ?? {}
    return (
        `SELECT products.*
         FROM products `
        + (category_id !== null ?
            `INNER JOIN categories on products.category_id = categories.id
            WHERE categories.id = ${category_id}`
            : '')
        + `LIMIT ${limit} OFFSET ${offset} ;`
    )
};

module.exports.findAll = (req, res) => {
    pool.query(sql_select_all(req.query),
        (err, response) => res.send(response?.rows)
    );
};
