const express = require('express');
const route = express.Router();
const passport = require('passport');
const {purchase} = require("../../pg_database/mutation/purchase");

route.post('/buy', passport.authenticate('jwt', {session: false}), purchase);

module.exports = route;
