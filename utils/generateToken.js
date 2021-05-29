const jwt = require('jsonwebtoken')
const {TOKEN_SECRET} = require('../config')

exports.generateAccessToken = (x) => {
    return jwt.sign(x, TOKEN_SECRET, {expiresIn: '1800s'});
}