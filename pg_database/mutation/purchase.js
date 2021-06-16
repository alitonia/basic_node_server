const pool = require('../connect_database.js');
const {getHash} = require('../../middlewares/passport/passport')
const bcrypt = require("bcrypt");


const purchaseCurrentCart = (id, body) => {
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

    return (
        `UPDATE receipts
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
    )
}


exports.purchase = (req, res) => {
    const user_id = req.user.id
    const body = req.body || {};

    pool.query(purchaseCurrentCart(user_id, body),
        (err, response) => {
            console.log(err, response)
            if (err || !response || response.rowCount === 0) {
                res.status(403)
                res.send('Can\'t make purchase. Please try again')
            } else {
                res.send('ok')
            }
        }
    );

}
