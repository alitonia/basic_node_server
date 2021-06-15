const pool = require('../connect_database.js');

const updateReceipts = (id, status) => {
    return (
        `UPDATE receipts
         set status = '${status}'
         where id = '${id}'
        ;`
    )
}

module.exports.updateReceipt = (req, res) => {
    const body = req.body
    const {id, status} = body || {}

    if (!id || !status) {
        return res.send({error: 'Something went wrong'})
    }

    pool.query(updateReceipts(id, status),
        (err, response) => {
            if (err || !response) {
                res.status = 501
                return res.send({error: 'Something went wrong'})
            }
            return res.send({status: 'OK'})
        }
    );
};