const express = require('express');
const route = express.Router();
const passport = require('passport');
const {updateCategory} = require("../../pg_database/admin/updateCategory");


route.put(
    '/admin/categories',
    passport.authenticate('jwt_admin', {session: false}),
    updateCategory
);

module.exports = route;
