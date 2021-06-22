const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/author', function(req, res) {
  res.send('Server made with love by alitonia');
});

module.exports = route;
