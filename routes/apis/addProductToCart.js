const express = require('express');
const route = express.Router();
const passport = require('passport');
const {addToCart} = require("../../pg_database/mutation/addProductToCart");
const {body, validationResult, query, param} = require('express-validator');

route.post(
    '/add_to_cart',
    passport.authenticate('jwt', {session: false}),
    body('product_id').isNumeric(),
    body('quantity').isInt({min: 1, max: 99}),
    body('color').isHexColor(),
    body('size').notEmpty().trim().isString().escape(),
    addToCart
);

module.exports = route;
