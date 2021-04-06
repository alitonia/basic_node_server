const pool = require('../connect_database.js');

const sql_select_reviews_of_product = (query) => {
    const {limit = 20, offset = 0, product_id = null, customer_id = null} = query ?? {}
    return `SELECT reviews.* FROM reviews 
    ${(product_id !== null) ?
        ` INNER JOIN products on products.id = reviews.product_id ` : ''
    }
    ${(customer_id !== null) ?
        ` INNER JOIN customers on customers.id = reviews.customer_id ` : ''
    }
    ${(product_id !== null || customer_id !== null) ?
        ` where ${(product_id !== null) ? ` products.id = ${product_id}` : ''}
        ${(product_id !== null && customer_id !== null) ? ' AND ' : ''}
        ${(customer_id !== null) ? ` customers.id = ${customer_id}` : ''}
        ` : ''}
    LIMIT ${limit} OFFSET ${offset}`
};

module.exports.findAll = (req, res) => {
    pool.query(sql_select_reviews_of_product(req.query),
        (err, response) => {
            res.send(response.rows)
        }
    );
};
