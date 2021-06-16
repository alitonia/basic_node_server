const pool = require('../connect_database.js');

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