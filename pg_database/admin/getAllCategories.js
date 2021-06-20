const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const sql_select_all = (query) => {
    const {
        limit = 30, offset = 0,
        parent_category = null,
        sortby = 'name',
        order = 'asc',
        searchby = '',
        is_short = false
    } = query ?? {}

    if (is_short) {
        return (
            `SELECT id
             FROM categories;
            `
        )
    }

    if (searchby === 'null') {
        return (
            `SELECT *
             FROM categories `
            + (
                (parent_category !== null) ?
                    ` where parent_category = ${parent_category} `
                    : ' where TRUE'
            )
            + ` and CAST(${sortby} AS VARCHAR) is NULL`
            + ` ORDER BY ${sortby} ${order} `
            + ` LIMIT ${limit} OFFSET ${offset} ;`
        )
    }

    return (
        `SELECT *
         FROM categories `
        + (
            (parent_category !== null) ?
                ` where parent_category = ${parent_category} `
                : ' where TRUE'
        )
        + `${searchby ? ` and CAST(${sortby} AS VARCHAR) ILIKE '%%${searchby}%' ` : ' '}`
        + ` ORDER BY ${sortby} ${order} `
        + ` LIMIT ${limit} OFFSET ${offset} ;`
    )
};

const allowedOrder = ['asc', 'desc']
const allowedSortby = [
    'name', 'id', 'parent_category', 'image_link', 'description'
]

module.exports.getAllCategories = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const query = req.query

        const {
            limit = 30, offset = 0,
            parent_category = null,
            sortby = 'name',
            order = 'asc',
            searchby = '',
            is_short = false
        } = query ?? {}

        console.log(order, sortby)
        if (
            (order && !allowedOrder.includes(order))
            || (sortby && !allowedSortby.includes(sortby))
        ) {
            return res.send({error: 'Something went wrong'})
        }

        const sql = sql_select_all(query)
        console.log(sql)

        const result = await pool.query(sql)
        res.send(result.rows)
    } catch (e) {
        console.warn(e)
        res.status(501)
        res.send({error: e.toString()})
    }
};
