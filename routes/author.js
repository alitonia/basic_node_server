const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/author', function(req, res) {
  res.status(404);
  res.send('Something went bombed');
});

module.exports = route;
