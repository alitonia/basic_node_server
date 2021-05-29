const pool = require('../connect_database.js');
const {getHash} = require('../../middlewares/passport/passport')
const bcrypt = require("bcrypt");


const addCustomerQuery = (user) => {
    const {first_name, last_name, email, password_hash, salt} = user
    return (
        `INSERT INTO customers(first_name, last_name, email, password_hash, salt)
        VALUES `
        + `('${first_name}', '${last_name}', '${email}', '${password_hash}', '${salt}');`
    )
}


exports.createUser = async function (user, cb) {
    const {name = null, email = null, password = null} = user;

    if (name === null || email === null || password === null) {
        return cb(new Error("Invalid request"), null);
    }

    const salt = bcrypt.genSaltSync(10);

    getHash(password, salt.toString())
        .then(password_hash => {
            const spliter = name.split(' ')
            if (name.length < 2) {
                return cb('Invalid name', false, {message: 'Invalid request'});
            }
            const first_name = spliter[0]
            const last_name = spliter.slice(1,).join(' ')

            const user = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password_hash: password_hash,
                salt: salt
            }

            pool.query(addCustomerQuery(user),
                (err, response) => {
                    if (err) {
                        return cb(err, null)
                    } else {
                        return cb(null, null)
                    }

                }
            )
        })
        .catch(err => {
            console.log(err)
            return cb(err, null)
        })
}
