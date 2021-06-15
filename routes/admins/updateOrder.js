const express = require('express');
const route = express.Router();
const passport = require('passport');
const {updateReceipt} = require("../../pg_database/admin/updateReceipt");


route.put(
    '/admin/orders',
    passport.authenticate('jwt_admin', {session: false}),
    updateReceipt
);

module.exports = route;
