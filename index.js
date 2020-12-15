const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'page/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'page/build', 'index.html'));
});

const meme_api = 'https://meme-api.herokuapp.com/gimme';
app.get('/meme', (req, res) => {
  axios.get(meme_api)
       .then(respond => {
         res.send(`<img src="${respond.data.url} alt='Meme Image'"/>`);
       })
       .catch(error => {
         console.warn(`Error: ${error.toString()}`);
         res.send('The server of this server is busy. Please try again 😅');
       });
});

const possible_values = ['Green Bean', 'Water Melon', 'Dragon Fruit', 'Definitely_not_Bomb'];
app.get('/names', function(req, res) {
  const index = Math.floor(Math.random() * possible_values.length);
  res.send(possible_values[index]);
});

app.get('/copyright', function(req, res) {
  // res.send('<h1>Made with love by alitonia</h1>');
  res.sendFile(path.join(__dirname, 'little_responses', 'make_with_love.html'));
});

app.get('/teapot', function(req, res) {
  res.status(418);
  res.send('I\'m a teapot');
});

app.post('/', (req, res) => {
  console.log(req.body);
  if (res.body.email) {
    res.send(`Email: ${req.body.email} subscribed 😊`);
  }
  else {
    res.status(503);
    res.send('Probably missing something. Please try again 🥺');
  }
});

app.post('/bikes', (req, res) => {
  const body = req.body;
  if (body && body.id !== undefined && body.id !== null) {
    res.send(body.id.toString());
  }
  else {
    res.status(404);
    res.send('Not found!');
  }
});


app.listen(PORT, (port) => {
  console.log(`Listening on port ${port}`);
});
