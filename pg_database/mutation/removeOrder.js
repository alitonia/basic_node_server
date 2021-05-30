const pool = require('../connect_database.js');

const remove = (query) => {
    const {product_id, receipt_id, color, size} = query ?? {}
    return (
        `DELETE
         FROM orders
         where receipt_id = '${receipt_id}'
           and product_id = '${product_id}'
           and color = '${color}'
           and size = '${size}'
        ;
        `
    )
};

module.exports.removeOrder = (req, res) => {
    console.log(req.body)
    pool.query(remove(req.body),
        (err, response) => {
            if (err) {
                res.status(403)
                res.send({error: 'Error deleting'})
            } else {
                res.send(response?.rows)
            }
        }
    );
};
