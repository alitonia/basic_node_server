const express = require('express');
const route = express.Router();
const passport = require('passport');
const {addToCart} = require("../../pg_database/mutation/addProductToCart");

route.post('/add_to_cart', passport.authenticate('jwt', {session: false}), addToCart);

module.exports = route;
