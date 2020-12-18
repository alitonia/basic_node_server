const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/author', function(req, res) {
  res.sendFile(path.join(__dirname, 'little_responses', 'make_with_love.html'));
});

module.exports = route;
