const express = require('express');
const route = express.Router();
const passport = require('passport');

const {getCart} = require('../../pg_database/queries/getCart');

route.get('/get_cart_id', passport.authenticate('jwt', {session: false}), getCart);

module.exports = route;
