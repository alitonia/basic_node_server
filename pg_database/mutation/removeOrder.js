const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const get = (query) => {
    const {product_id, receipt_id, color, size} = query ?? {}
    return (
        `SELECT orders.receipt_id as id, orders.quantity as quantity, orders.product_id as product_id
         FROM orders
                  INNER JOIN receipts on orders.receipt_id = receipts.id
         where orders.receipt_id = '${receipt_id}'
           and orders.product_id = '${product_id}'
           and orders.color = '${color}'
           and orders.size = '${size}'
           and receipts.status = 'created'
        ;
        `
    )
}
const remove = (target_id, product_id, quantity) => {
    return (
        `
        START TRANSACTION;
        DELETE
         FROM orders
         where receipt_id = '${target_id}'
        ;
        UPDATE products
        SET current_stock = current_stock + ${quantity},
            bought        = bought - ${quantity}
        where id = ${product_id};
        COMMIT;
        `
    )
};

module.exports.removeOrder = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body)
    pool.query(get(req.body), (err, response) => {
        if (err || !response) {
            res.status(403)
            return res.send({error: 'Error deleting'})
        }
        if (response.rows.length > 0) {
            const target_id = response.rows[0].id
            const quantity = response.rows[0].quantity
            const product_id = response.rows[0].product_id

            pool.query(remove(target_id, product_id, quantity),
                (err, response) => {
                    if (err) {
                        res.status(403)
                        res.send({error: 'Error deleting'})
                    } else {
                        res.send(response?.rows)
                    }
                }
            );
        } else {
            res.status(403)
            return res.send({error: 'Error deleting'})
        }
    })
};
