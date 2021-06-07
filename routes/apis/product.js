const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {find} = require('../../pg_database/queries/product');

route.get('/product/:id', param('id').isNumeric(), find);
// localhost/product/2

module.exports = route;
