const express = require('express');
const route = express.Router();

const {findCategory} = require('../../pg_database/queries/category');
const {body, validationResult, query, param} = require('express-validator');


route.get(
    '/category/:id',
    param('id').isNumeric(),
    findCategory
);

module.exports = route;
