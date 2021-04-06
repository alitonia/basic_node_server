const express = require('express');
const route = express.Router();

const {findAll} = require('../../pg_database/queries/reviews');

route.get('/reviews', findAll);

module.exports = route;
