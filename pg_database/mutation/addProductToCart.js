const pool = require('../connect_database.js');
const {body, validationResult, query, param} = require('express-validator');

const select_product_id = (id) => {
    return (
        `SELECT *
         FROM products
         where id = ${id}
           and available = true;`
    )
};

const check_existing_cart = (id) => {
    return (
        `SELECT *
         FROM receipts
         where customer_id = ${id}
           and status = 'created';`
    )
}

const create_cart = (user_id) => {
    return (
        `INSERT INTO receipts(customer_id)
         VALUES (${user_id});`
    )
}

const buy_product = (id, quantity) => {
    return (
        `
            UPDATE products
            set quantity = quantity - ${quantity}
            where id = ${id};

        `
    )
}


const check_existing_orders = (receipt_id, product_id, color, size) => {
    return (
        `SELECT *
         FROM orders
         where receipt_id = ${receipt_id}
           and product_id = ${product_id}
           and color = ${color ? "'" + color + "'" : 'NULL'}
           and size = ${size ? "'" + size + "'" : 'NULL'}
        `
    )
}

const create_new_order = (receipt_id, product_id, quantity, color, size) => {
    return (
        `INSERT INTO orders(receipt_id, product_id, quantity, color, size)
         values (${receipt_id}, ${product_id}, ${quantity},
                 ${color ? "'" + color + "'" : 'NULL'}, ${size ? "'" + size + "'" : 'NULL'});
        `
    )
}


const add_to_existing_order = (receipt_id, product_id, quantity, color, size) => {
    return (
        `UPDATE orders
         set quantity = quantity + ${quantity}
         where receipt_id = ${receipt_id}
           and product_id = ${product_id}
           and color = ${color ? "'" + color + "'" : 'NULL'}
           and size = ${size ? "'" + size + "'" : 'NULL'}
        ;
        `
    )
}


module.exports.addToCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const body = req.body
    const product_id = body && body.product_id ? body.product_id : null
    const quantity = body && body.quantity ? Number.parseInt(body.quantity) : null

    const color = body && body.color ? body.color : null
    const size = body && body.size ? body.size : null

    const user_id = req.user.id

    if (product_id && quantity) {
        // return res.send('ok')
        pool.query(select_product_id(product_id),
            (err, response) => {
                if (err) {
                    res.status(403)
                    return res.send('Connection error')
                }
                const check_avail = response.rows.length > 0
                if (check_avail <= 0) {
                    res.status(403)
                    return res.send('Product doesn\'t exist')
                } else if (response.rows[0].current_stock < quantity) {
                    res.status(403)
                    return res.send('Out of stock')
                } else {
                    // res.send('ok')
                    pool.query(check_existing_cart(user_id), async (err1, response1) => {
                        if (err1) {
                            res.status(403)
                            return res.send('Error checking cart')
                        }
                        if (!response1 || response1.rows.length === 0) {
                            await pool.query(create_cart(user_id), (err2, response2) => {
                                    if (err2) {
                                        res.status(403)
                                        return res.send('Error create new cart')
                                    } else {
                                    }
                                }
                            )
                        } else {
                            //have cart
                        }

                        pool.query(check_existing_cart(user_id), (err, response) => {
                            if (err || response.rows.length === 0) {
                                res.status(403)
                                return res.send('Error create new cart')
                            } else {
                                const receipt_id = response.rows[0].id
                                // if product already exist => add more, else create new order
                                pool.query(check_existing_orders(receipt_id, product_id, color, size), (err, response) => {
                                    if (err) {
                                        res.status(403)
                                        return res.send('Internal error')
                                    } else if (response.rows.length === 0) {
                                        pool.query(create_new_order(receipt_id, product_id, quantity, color, size), (err, response) => {
                                                if (err) {
                                                    res.status(403)
                                                    return res.send('Internal error')
                                                } else {
                                                    res.send('OK')
                                                }
                                            }
                                        )
                                    } else {
                                        pool.query(add_to_existing_order(receipt_id, product_id, quantity, color, size), (err, response) => {
                                                if (err) {
                                                    res.status(403)
                                                    return res.send('Internal error')
                                                } else {
                                                    res.send('OK')
                                                }
                                            }
                                        )
                                    }
                                })
                            }
                        })
                    })
                }
            });
    } else {
        res.status(401)
        return res.send("Invalid request")
    }

};
