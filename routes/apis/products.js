const express = require('express');
const route = express.Router();

const {findAll} = require('../../pg_database/queries/all_products');

route.get('/products', findAll);
//localhost/products

module.exports = route;
