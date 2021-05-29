const express = require('express');
const route = express.Router();

const {findCategory} = require('../../pg_database/queries/category');

route.get('/category/:id', findCategory);

module.exports = route;
