const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {getAllCategories} = require('../../pg_database/admin/getAllCategories');

route.get(
    '/admin/categories',
    query('limit').isNumeric().optional({nullable: true}),
    query('offset').isNumeric().optional({nullable: true}),
    query('parent_category').isNumeric().optional({nullable: true}),
    query('is_short').isBoolean().optional({nullable: true}),
    getAllCategories
);

module.exports = route;
