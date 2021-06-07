const express = require('express');
const route = express.Router();
const passport = require('passport');
const {addToCart} = require("../../pg_database/mutation/addProductToCart");
const {body, validationResult, query, param} = require('express-validator');

route.post(
    '/add_to_cart',
    passport.authenticate('jwt', {session: false}),
    body('product_id').isNumeric(),
    body('quantity').isNumeric(),
    body('color').isHexColor(),
    body('size').isString(),
    addToCart
);

module.exports = route;
