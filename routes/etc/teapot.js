const express = require('express');
const route = express.Router();

route.get('/teapot', function(req, res) {
  res.status(418);
  res.send('I\'m a teapot');
});

module.exports = route;

