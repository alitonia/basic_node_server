const pool = require('../connect_database.js');

const purchaseCurrentCart = (id, body, totalCountObject) => {
    const {
        first_name,
        last_name,
        company_name,
        email_address,
        phone_number,
        country,
        address,
        postcode,
        city,
        note,
        hidden_payment: payment
    } = body

    const changeQuantityQuery = Object.entries(totalCountObject).reduce((acc, [key, value]) => {
        return acc + (
            `UPDATE products
             SET current_stock = current_stock - ${value.count},
                 bought        = bought + ${value.count}
             WHERE id = ${key};
            `
        )
    }, '')

    return (
        'START TRANSACTION;'
        + changeQuantityQuery
        + `UPDATE receipts
           SET status='pending',
               billing_first_name='${first_name}',
               billing_last_name='${last_name}',
               company_name='${company_name}',
               email='${email_address}',
               phone_number='${phone_number}',
               country='${country}',
               address='${address}',
               postcode='${postcode}',
               city='${city}',
               note=${note ? `'${note}'` : 'NULL'},
               payment_method='${payment}'
           WHERE customer_id = ${id}
             and status = 'created';`
        + 'COMMIT;'
    )
}

const check_existing_orders = (customer_id) => {
    return (
        `SELECT *
         FROM orders
                  INNER JOIN products p on orders.product_id = p.id
                  INNER JOIN receipts r on orders.receipt_id = r.id
                  INNER JOIN customers c on c.id = r.customer_id
         WHERE customer_id = ${customer_id}
           and r.status = 'created'
        `
    )
}

const checkUserActive = (customer_id) => {
    return `
        SELECT *
        FROM customers
        where id = ${customer_id}
          and status = 'active';
    `
}


exports.purchase = async (req, res) => {
    const user_id = req.user.id
    const body = req.body || {};

    try {
        const user = await pool.query(checkUserActive(user_id))
        if (user.rowCount === 0) {
            throw new Error('Invalid request')
        }

        const existing_orders = await pool.query(check_existing_orders(user_id))

        if (existing_orders.rowCount === 0) {
            // console.log('No product in cart')
            throw new Error('No products in cart')
        }
        const notHaveDeleted = existing_orders.rows.reduce((acc, cur) => acc && cur.available, true)

        const totalCountObject = existing_orders.rows.reduce((acc, cur) => {
            if (!acc[cur.product_id]) {
                acc[cur.product_id] = {
                    count: cur.quantity,
                    max: cur.current_stock
                }
            } else {
                acc[cur.product_id].count += cur.quantity
            }
            return acc
        }, {})

        const hasEnoughVar = Object.values(totalCountObject).reduce((acc, cur) => acc && cur.count <= cur.max, true)

        if (!notHaveDeleted || !hasEnoughVar) {
            // console.log('Have deleted product')
            throw new Error('Your cart have out of stock products')
        }

        const addCartResult = await pool.query(purchaseCurrentCart(user_id, body, totalCountObject));

        res.send({status: 'OK'})
    } catch (e) {
        console.log(e)
        res.send({error: e.toString()})
    }
}
