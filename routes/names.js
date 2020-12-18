const express = require('express');
const route = express.Router();

const possible_values = ['Green Bean', 'Water Melon', 'Dragon Fruit', 'Definitely_not_Bomb'];

route.get('/names', function(req, res) {
  const index = Math.floor(Math.random() * possible_values.length);
  res.send(possible_values[index]);
});

module.exports = route;
