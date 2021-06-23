const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/author', function (req, res) {
    res.send('Server made with love by <a href="https://github.com/alitonia">alitonia</a>');
});

module.exports = route;
