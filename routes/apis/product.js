const express = require('express');
const route = express.Router();

const {find} = require('../../pg_database/queries/product');

route.get('/product/:id', find);

module.exports = route;
