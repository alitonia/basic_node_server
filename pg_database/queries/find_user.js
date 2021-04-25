const pool = require('../connect_database.js');

const query = (value, field) => {
    return (
        `SELECT *
         FROM customers `
        + (`WHERE ${field} = '${value}'`)
    )
}

const queryId = (id) => query(id, 'id')
const queryUserName = (username) => query(username, 'email')


exports.findUser = function (hint, cb) {
    const {id = null, username = null} = hint;

    if (id === null && username === null) {
        return cb(null, null);
    }

    const handleResult = (err, response) => {
        if (err) {
            return cb(null, null)
        }
        if (response.rows && response.rows.length > 0) {
            const data = response.rows[0]
            return cb(null, data)
        }
        return cb(null, null);
    }

    process.nextTick(function () {
            if (id !== null) {
                pool.query(queryId(id), handleResult);
            } else {
                pool.query(queryUserName(username), handleResult);
            }
        }
    );
}