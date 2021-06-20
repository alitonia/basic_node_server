const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {limit = 30, offset = 0, sortby = 'name', order = 'asc', searchby = ''} = query ?? {}

    const q = `SELECT customers.id           as id,
                      customers.first_name   as first_name,
                      customers.last_name    as last_name,
                      customers.email        as email,
                      customers.gender       as gender,
                      customers.status       as status,
                      customers.created_date as created_date
               FROM customers `
        + `${searchby ? ` where CAST(${sortby} AS VARCHAR) ILIKE '%%${searchby}%' ` : ''}`
        + ` ORDER BY ${sortby} ${order} `
        + `LIMIT ${limit} OFFSET ${offset}`
        + ' ;'
    console.log(q)
    return q
}

const allowedOrder = ['asc', 'desc']
const allowedSortby = [
    'id',
    'first_name',
    'last_name',
    'email',
    'gender',
    'status',
    'created_date',
]

module.exports.getAllCustomers = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {limit = 30, offset = 0, sortby = 'id', order = 'asc', searchby = ''} = req.params || {}

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
