const express = require('express');
const route = express.Router();
const passport = require('passport');

const {getReceipt} = require('../../pg_database/queries/getReceipt');

route.get('/order/:id', passport.authenticate('jwt', {session: false}), getReceipt);

module.exports = route;
