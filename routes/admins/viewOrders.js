const express = require('express');
const route = express.Router();
const passport = require('passport');
const {getAllReceipts} = require("../../pg_database/admin/getAllReceipts");


route.get('/admin/orders', passport.authenticate('jwt_admin', {session: false}), getAllReceipts);

module.exports = route;
