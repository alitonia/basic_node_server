const express = require('express');
const route = express.Router();
const passport = require('passport');
const {addAProduct} = require("../../pg_database/admin/addProduct");


route.post(
    '/admin/products',
    passport.authenticate('jwt_admin', {session: false}),
    addAProduct
);

module.exports = route;
