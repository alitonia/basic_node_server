const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {findAll} = require('../../pg_database/queries/all_products');

route.get(
    '/products',
    query('limit').isNumeric().optional({nullable: true}),
    query('offset').isNumeric().optional({nullable: true}),
    query('category_id').isNumeric().optional({nullable: true}),
    query('limit').isNumeric().optional({nullable: true}),
    query('sortby').isString().optional({nullable: true}),
    query('search').isString().optional({nullable: true}),
    findAll
);
//localhost/products

module.exports = route;
