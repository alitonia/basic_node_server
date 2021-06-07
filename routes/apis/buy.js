const express = require('express');
const route = express.Router();
const passport = require('passport');
const {purchase} = require("../../pg_database/mutation/purchase");
const {body, validationResult, query, param} = require('express-validator');

route.post('/buy',
    passport.authenticate('jwt', {session: false}),
    body('first_name').isString(),
    body('last_name').isString(),
    body('company_name').isString(),
    body('phone_number').isNumeric(),
    body('country').isString(),
    body('address').isString(),
    body('postcode').isString(),
    body('city').isString(),
    body('note').isString().optional({nullable: true}),
    body('hidden_payment').isString(),
    purchase);

module.exports = route;
