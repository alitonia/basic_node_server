const pool = require('../connect_database.js');

const updateProductQuery = (id, field, value) => {
    return (
        `UPDATE products
         set ${field} = ${value}
         where id = '${id}'
        ;`
    )
}

const valueTree = {
    available: {
        values: [true, false],
        any: false
    }
}

module.exports.updateProduct = (req, res) => {
    const body = req.body
    const {id, field, value} = body || {}

    const allowedFields = Object.keys(valueTree)
    if (!id || !allowedFields.includes(field) || (!valueTree[field].values.includes(value) && !valueTree[field].any)) {
        return res.send({error: 'Something went wrong'})
    }

    pool.query(updateProductQuery(id, field, value),
        (err, response) => {
            if (err || !response) {
                res.status(501)
                return res.send({error: 'Something went wrong'})
            }
            return res.send({status: 'OK'})
        }
    );
};