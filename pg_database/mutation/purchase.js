const pool = require('../connect_database.js');
const {getHash} = require('../../middlewares/passport/passport')
const bcrypt = require("bcrypt");


const puchaseCurrentCart = (id) => {
    return (
        `UPDATE receipts SET status='pending' WHERE customer_id=${id} and status='created';`
    )
}


exports.purchase = (req, res) => {
    const user_id = req.user.id
    pool.query(puchaseCurrentCart(user_id),
        (err, response) => {
            if (err) {
                res.status(403)
                res.send('Can\'t make purchase. Please try again')
            }else {
                res.send('ok')
            }
        }
    );

}
