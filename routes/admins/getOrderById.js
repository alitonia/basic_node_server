const express = require('express');
const route = express.Router();
const passport = require('passport');
const {getReceiptById} = require("../../pg_database/admin/getReceiptById");


route.get(
    '/admin/orders/:id',
    passport.authenticate('jwt_admin', {session: false}),
    getReceiptById
);

module.exports = route;
