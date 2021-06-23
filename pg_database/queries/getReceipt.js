const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const get_products_in_cart = (receipt_id) => {
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
           and orders.product_id = products.id;`
    )
}

const get_receipts_by_userID = (customer_id, receipt_id) => {
    return (
        `SELECT *
         FROM receipts
         where customer_id = ${customer_id}
           and id = ${receipt_id}
           and status != 'created';
        `
    )
}

module.exports.getReceipt = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: 'Invalid request'});
    }

    const user_id = req.user.id
    const receipt_id = req.params.id

    if (!receipt_id || !user_id) {
        res.status(404)
        return res.send({error: 'Id not founds'})
    }

    pool.query(get_receipts_by_userID(user_id, receipt_id),
        (err, response) => {
            if (err || !response) {
                res.status(501)
                return res.send({error: 'Something went wrong'})
            }
            if (response.rows.length === 0) {
                res.status(404)
                return res.send({error: 'Id not found'})
            }
            const valid_response = response.rows[0]
            pool.query(get_products_in_cart(receipt_id), (err, response) => {
                if (err || !response) {
                    res.status(501)
                    return res.send({error: 'Something went wrong'})
                }
                valid_response.products = response.rows
                return res.send([valid_response])
            })
        }
    );
};