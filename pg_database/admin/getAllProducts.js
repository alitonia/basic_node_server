const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {limit = 30, offset = 0, sortby = 'name', order = 'asc', searchby = ''} = query ?? {}

    const q = `SELECT products.*
               FROM products `
        + `${searchby ? ` where CAST(${sortby} AS VARCHAR) ILIKE '%%${searchby}%' ` : ''}`
        + ` ORDER BY ${sortby} ${order} `
        + `LIMIT ${limit} OFFSET ${offset}`
        + ' ;'
    // console.log(q)
    return q
}

const allowedOrder = ['asc', 'desc']
const allowedSortby = [
    'name', 'id', 'price', 'current_stock',
    'bought', 'category_id', 'created_date', 'available',
    'rating', 'total_rated', 'big_image_link'
]

module.exports.getAllProducts = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {limit = 30, offset = 0, sortby = 'name', order = 'asc', searchby = ''} = req.params || {}

    if (
        (order && !allowedOrder.includes(order))
        || (sortby && !allowedSortby.includes(sortby))
    ) {
        return res.send({error: 'Something went wrong'})
    }

    pool.query(sql_select_all(req.query),
        (err, response) => res.send(response?.rows)
    );
};
