const pool = require('../connect_database.js');

const get_products_in_cart = (cart_id) => {
    return (
        `SELECT orders.receipt_id       as receipt_id,
                orders.product_id       as product_id,
                orders.quantity         as quantity,
                orders.color            as color,
                orders.size             as size,
                products.price          as price,
                products.name           as product_name,
                products.big_image_link as big_image_link,
                products.available      as available
         FROM orders,
              products
         where orders.receipt_id = ${cart_id}
           and orders.product_id = products.id;`
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
    console.log(req.user)

    pool.query(get_existing_cart(user_id),
        (err, response) => {
            if (err || !response) {
                res.status = 501
                return res.send({error: 'Something went wrong'})
            }
            if (response.rows === 0 || !response.rows[0]) {
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