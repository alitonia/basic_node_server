const express = require('express');
const path = require('path');
const route = express.Router();

const {findAll} = require('../database/productControler.js');

route.get('/iphone', findAll);

module.exports = route;
