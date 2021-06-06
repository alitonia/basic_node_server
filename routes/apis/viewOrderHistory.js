const express = require('express');
const route = express.Router();
const passport = require('passport');

const {getReceipts} = require('../../pg_database/queries/getReceipts');

route.get('/orders', passport.authenticate('jwt', {session: false}), getReceipts);

module.exports = route;
