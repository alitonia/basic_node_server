const express = require('express');
const route = express.Router();
const path = require('path');

route.use(express.static(path.join(__dirname, '../page/build')));

route.post('/', (req, res) => {
  const {body} = req;

  if (body.email) {
    res.send(`Email: ${body.email} subscribed 😊`);
  }
  else {
    res.status(503);
    res.send('Probably missing something. Please try again 🥺');
  }
});

module.exports = route;
