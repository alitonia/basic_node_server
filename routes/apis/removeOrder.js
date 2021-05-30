const express = require('express');
const route = express.Router();
const passport = require('passport')

const {removeOrder} = require('../../pg_database/mutation/removeOrder');

route.delete('/order', passport.authenticate('jwt', {session: false}), removeOrder);

module.exports = route;
