const pool = require('../connect_database.js');
const {validationResult} = require("express-validator");

const allowedKey = ['sale', 'bestseller', 'feature']

const toOrderByString = (x) => {
    const element = x.split('+').filter(k => allowedKey.includes(k))
    if (element.length === 0) {
        return ''
    }

    let str = '  ORDER BY '

    if (element.includes('sale')) {
        str += ' price asc '
    } else if (element.includes('bestseller')) {
        str += ' bought desc'

    } else if (element.includes('feature')) {
        str += ' rating desc'
    }
    return str
}

const sql_select_all = (query) => {
        const {limit = 20, offset = 0, category_id = null, sortby = 'name', search = ''} = query ?? {}

        const isMaleficNamedSort = allowedKey.includes(sortby)

        const x = `SELECT products.*
                   FROM products `
            + (category_id !== null ?
                `INNER JOIN categories on products.category_id = categories.id
            WHERE categories.id = ${category_id} and available != false`
                : `INNER JOIN categories on products.category_id = categories.id
            WHERE available != false`)
            + ((category_id === null) ? `${!!search ? ` and products.name ILIKE '%%${search}%' ` : ''}` : '')
            + '   ' + (isMaleficNamedSort ? toOrderByString(sortby) : ` ORDER BY ${sortby} `) + '  '
            + `LIMIT ${limit} OFFSET ${offset}`
            + ' ;'

        return (
            x
        )
    }
;

module.exports.findAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    pool.query(sql_select_all(req.query),
        (err, response) => res.send(response?.rows)
    );
};
