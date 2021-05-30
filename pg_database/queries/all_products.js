const pool = require('../connect_database.js');

const tryParse = (x, fallback = null) => {
    try {
        return JSON.parse(x)
    } catch (e) {
        console.log(e)
        return fallback
    }
}

const toOrderByString = (x) => {
    const allowedKey = ['sale', 'bestseller', 'feature']
    const element = x.split('+').filter(k => allowedKey.includes(k))
    if (element.length === 0) {
        return ''
    }

    let str = '  ORDER BY '

    if (element.includes('sale')) {
        str += ' price asc '
    }
    else if (element.includes('bestseller')) {
        str += ' bought desc'

    }
    else if (element.includes('feature')) {
        str += ' rating desc'
    }
    console.log(str)

    return str
}

const sql_select_all = (query) => {
    const {limit = 20, offset = 0, category_id = null, sortby = ''} = query ?? {}
    // const
    return (
        `SELECT products.*
         FROM products `
        + (category_id !== null ?
            `INNER JOIN categories on products.category_id = categories.id
            WHERE categories.id = ${category_id}`
            : '')
        + '   ' + toOrderByString(sortby) + ' '

        + `LIMIT ${limit} OFFSET ${offset}`
        + ' ;'
    )
};

module.exports.findAll = (req, res) => {
    pool.query(sql_select_all(req.query),
        (err, response) => res.send(response?.rows)
    );
};
