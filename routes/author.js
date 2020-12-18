const express = require('express')
const  route = express.Router()

route.get('/copyright', function(req, res) {
  // res.send('<h1>Made with love by alitonia</h1>');
  res.sendFile(path.join(__dirname, 'little_responses', 'make_with_love.html'));
});

module.exports = route
