const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {getAllProducts} = require('../../pg_database/admin/getAllProducts');

route.get(
    '/admin/products',
    query('limit').isNumeric().optional({nullable: true}),
    query('offset').isNumeric().optional({nullable: true}),
    query('limit').isNumeric().optional({nullable: true}),
    query('sortby').isString().optional({nullable: true}),
    query('search').isString().optional({nullable: true}),
    getAllProducts
);

module.exports = route;
