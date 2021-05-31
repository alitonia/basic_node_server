const express = require('express');
const route = express.Router();

const {find} = require('../../pg_database/queries/product');

route.get('/product/:id', find);
// localhost/product/2

module.exports = route;
