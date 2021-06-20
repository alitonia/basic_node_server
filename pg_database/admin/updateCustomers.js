const pool = require('../connect_database.js');


const updateProductQuery = (id, fields) => {
    const length = Object.keys(fields).length

    const sets = Object.entries(fields).reduce((acc, [key, val], index) => {
        return `${acc} ${key} = '${val}' ${(index === length - 1) ? '' : ','}`
    }, 'set ')

    return (
        `UPDATE customers
        ${sets}
        where id = ${id}
        ;`
    )
}

const allowedFields = [
    'status'
]


module.exports.updateCustomer = async (req, res) => {

    try {
        const body = req.body
        const {id} = body || {}


        if (!id) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }

        const reqOb = {}

        //sanitize
        const emptyValues = [null, undefined, ''];

        Object.entries(body || {}).forEach(([key, val]) => {
            if (allowedFields.includes(key) && !emptyValues.includes(val)) {
                reqOb[key] = val
            }
        })

        //no modification
        if (Object.keys(reqOb).length === 0) {
            return res.send({status: 'OK', id: id})
        }

        const modifyingQuery = updateProductQuery(id, reqOb)

        console.log(modifyingQuery)

        try {
            await pool.query(modifyingQuery)
        } catch (e) {
            console.log(e)
            res.status(501)
            return res.send({error: "Internal error"})
        }

        return res.send({status: 'OK', id: id})
    } catch (e) {
        console.log(e)
        res.status(501)
        return res.send({error: "Internal error"})
    }
};