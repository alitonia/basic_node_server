const express = require('express');
const route = express.Router();
const passport = require('passport')
const {body, validationResult, query, param} = require('express-validator');

const {removeOrder} = require('../../pg_database/mutation/removeOrder');

route.delete(
    '/order',
    passport.authenticate('jwt', {session: false}),
    body('product_id').isNumeric(),
    body('receipt_id').isNumeric(),
    body('color').isHexColor(),
    body('size').isString(),
    removeOrder);

module.exports = route;
