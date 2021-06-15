const pool = require('../connect_database.js');

const query = (value, field, table = 'customer') => {
    return (
        `SELECT *
         FROM ${table} `
        + (`WHERE ${field} = '${value}'`)
    )
}

const queryId = (id) => query(id, 'id')
const queryUserName = (username) => query(username, 'email')

const queryAdminId = (id) => query(id, 'id', 'admins')
const queryAdminUserName = (username) => query(username, 'email', 'admins')


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


exports.findAdmin = function (hint, cb) {
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
                pool.query(queryAdminId(id), handleResult);
            } else {
                pool.query(queryAdminUserName(username), handleResult);
            }
        }
    );
}