const express = require('express');
const path = require('path');
const route = express.Router();

const {findAll} = require('../pg_database/test.js');

route.get('/iphone', findAll);

module.exports = route;
