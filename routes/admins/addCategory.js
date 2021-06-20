const express = require('express');
const route = express.Router();
const passport = require('passport');
const {addACategory} = require("../../pg_database/admin/addCategory");


route.post(
    '/admin/categories',
    passport.authenticate('jwt_admin', {session: false}),
    addACategory
);

module.exports = route;
