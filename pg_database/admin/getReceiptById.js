const pool = require('../connect_database.js');

const productValues = ['price', 'product_name']

const translate = (x) => {
    const tableName = productValues.includes(x) ? 'products' : 'orders'

    let field = ''
    if (x === 'product_name') {
        field = 'name'
    } else {
        field = x
    }
    return `${tableName}.${field}`
}


const get_products = (receipt_id, query) => {
    const {limit = 30, offset = 0, sortby = 'product_name', order = 'asc', searchby = ''} = query ?? {}

    const translatedField = translate(sortby)

    return (
        `SELECT orders.receipt_id       as receipt_id,
                orders.product_id       as product_id,
                orders.quantity         as quantity,
                orders.color            as color,
                orders.size             as size,
                products.price          as price,
                products.name           as product_name,
                products.big_image_link as big_image_link
         FROM orders,
              products
         where orders.receipt_id = ${receipt_id}
           and orders.product_id = products.id `
        + `${searchby ? ` and CAST(${translatedField} AS VARCHAR) ILIKE '%%${searchby}%' ` : ''}`
        + ` ORDER BY ${sortby} ${order} `
        + `LIMIT ${limit} OFFSET ${offset}`
        + ' ;'

    )
}

const get_receipt = (receipt_id) => {
    return (
        `SELECT *
         FROM receipts
         where id = ${receipt_id}
           and status != 'created';
        `
    )
}

const allowedOrder = ['asc', 'desc']
const allowedSortby = [
    'product_id', 'quantity', 'color',
    'size', 'price', 'product_name'
]

module.exports.getReceiptById = (req, res) => {
    const {id} = req.params || {}

    const {sortby = 'product_name', order = 'asc'} = req.query || {}

    if (!id) {
        return res.send({error: 'Something went wrong 1'})
    }
    if (
        (order && !allowedOrder.includes(order))
        || (sortby && !allowedSortby.includes(sortby))
    ) {
        return res.send({error: 'Something went wrong 2'})
    }

    pool.query(get_receipt(id),
        (err, response) => {
            if (err || !response) {
                res.status = 501
                return res.send({error: 'Something went wrong 3'})
            }
            if (response.rows.length === 0) {
                res.status(404)
                return res.send({error: 'Id not found'})
            }
            const valid_response = response.rows[0]

            pool.query(get_products(id, req.query), (err, response) => {
                if (err || !response) {
                    res.status(501)
                    return res.send({error: 'Something went wrong 4'})
                }
                valid_response.products = response.rows
                return res.send([valid_response])
            })
        }
    );
};