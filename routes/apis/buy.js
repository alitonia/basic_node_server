const express = require('express');
const route = express.Router();
const passport = require('passport');
const {purchase} = require("../../pg_database/mutation/purchase");
const {body, validationResult, query, param} = require('express-validator');

route.post('/buy',
    passport.authenticate('jwt', {session: false}),
    body('first_name').trim().notEmpty().isString().escape(),
    body('last_name').trim().notEmpty().isString().escape(),
    body('company_name').trim().notEmpty().isString().escape(),
    body('phone_number').trim().notEmpty().isString().escape(),
    body('country').trim().notEmpty().isString().escape(),
    body('address').trim().notEmpty().isString().escape(),
    body('postcode').trim().notEmpty().isString().escape(),
    body('city').trim().notEmpty().isString().escape(),
    body('note').trim().isString().escape().optional({nullable: true}),
    body('hidden_payment').trim().notEmpty().isString().escape(),
    purchase
);

module.exports = route;
