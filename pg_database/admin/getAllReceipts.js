const pool = require('../connect_database.js');

const get_receipts = (sortby, order) => {
    return (
        `SELECT *
         FROM receipts
         where status != 'created'
         ORDER BY ${sortby} ${order}
        ;`
    )
}

const allowedSortby = ['status', 'order_date', 'email', 'customer_id', 'id']
const allowedOrder = ['desc', 'asc']


module.exports.getAllReceipts = (req, res) => {
    const {sortby = 'status', order = 'des'} = req.query || {}

    if (!allowedOrder.includes(order) || !allowedSortby.includes(sortby)) {
        return res.send({error: 'Something went wrong'})
    }

    pool.query(get_receipts(sortby, order),
        (err, response) => {
            if (err || !response) {
                res.status = 501
                return res.send({error: 'Something went wrong'})
            }
            return res.send(response.rows)
        }
    );
};