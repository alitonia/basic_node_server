const express = require('express');
const route = express.Router();
const passport = require('passport');
const {body, validationResult, query, param} = require('express-validator');

const {getReceipt} = require('../../pg_database/queries/getReceipt');

route.get('/order/:id',
    passport.authenticate('jwt', {session: false}),
    param('id').isNumeric()
    , getReceipt);

module.exports = route;
