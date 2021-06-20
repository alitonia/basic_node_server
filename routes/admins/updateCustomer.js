const express = require('express');
const route = express.Router();
const passport = require('passport');
const {updateCustomer} = require("../../pg_database/admin/updateCustomers");


route.put(
    '/admin/customers',
    passport.authenticate('jwt_admin', {session: false}),
    updateCustomer
);

module.exports = route;
