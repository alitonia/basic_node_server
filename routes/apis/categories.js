const express = require('express');
const path = require('path');
const route = express.Router();

const {findAll} = require('../../pg_database/queries/all_categories');

route.get('/categories', findAll);

module.exports = route;
