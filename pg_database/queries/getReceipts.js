const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const get_receipts_by_userID = (id) => {
    return (
        `SELECT *
         FROM receipts
         where customer_id = ${id}
           and status != 'created';
        `
    )
}

module.exports.getReceipts = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: 'Invalid request'});
    }

    const user_id = req.user.id

    pool.query(get_receipts_by_userID(user_id),
        (err, response) => {
            if (err || !response) {
                res.status(501)
                return res.send({error: 'Something went wrong'})
            }
            return res.send(response.rows)
        }
    );
};