const express = require('express');
const route = express.Router();
const passport = require('passport');
const {updateProduct} = require("../../pg_database/admin/updateProduct");


route.put(
    '/admin/products',
    passport.authenticate('jwt_admin', {session: false}),
    updateProduct
);

module.exports = route;
