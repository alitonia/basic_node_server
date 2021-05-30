const pool = require('../connect_database.js');

const get_products_in_cart = (cart_id) => {
    return (
        `SELECT *
         FROM orders
         where receipt_id = ${cart_id};`
    )
}

const get_existing_cart = (id) => {
    return (
        `SELECT *
         FROM receipts
         where customer_id = ${id}
           and status = 'created';`
    )
}

module.exports.getCart = (req, res) => {
    const user_id = req.user.id

    pool.query(get_existing_cart(user_id),
        (err, response) => {
            if (err || !response) {
                res.status = 501
                return res.send({error: 'Something went wrong'})
            }
            if (response.rows === 0) {
                return res.send([])
            }

            const cart_id = response.rows[0].id
            pool.query(get_products_in_cart(cart_id),
                (err, response) => {
                    if (err || !response) {
                        res.status = 501
                        return res.send({error: 'Something went wrong'})
                    }
                    return res.send(response?.rows)
                }
            )
        }
    );
};