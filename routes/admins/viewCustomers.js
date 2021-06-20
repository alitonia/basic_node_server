const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {getAllCustomers} = require('../../pg_database/admin/getAllCustomers');

route.get(
    '/admin/customers',
    query('limit').isNumeric().optional({nullable: true}),
    query('offset').isNumeric().optional({nullable: true}),
    query('sortby').isString().optional({nullable: true}),
    query('search').isString().optional({nullable: true}),
    getAllCustomers
);

module.exports = route;
