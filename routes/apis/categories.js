const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {findAll} = require('../../pg_database/queries/all_categories');

route.get(
    '/categories',
    query('limit').isNumeric().optional({nullable: true}),
    query('offset').isNumeric().optional({nullable: true}),
    query('parent_category').isNumeric(),
    findAll
);

module.exports = route;
