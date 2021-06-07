const express = require('express');
const route = express.Router();
const {body, validationResult, query, param} = require('express-validator');

const {findAll} = require('../../pg_database/queries/reviews');

route.get('/reviews',
    query('offset').isNumeric().optional({nullable: true}),
    query('limit').isNumeric().optional({nullable: true}),
    query('product_id').isNumeric().optional({nullable: true}),
    query('customer_id').isString().optional({nullable: true}),
    findAll
);

module.exports = route;
