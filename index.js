const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'page/build')));

app.get('/', (req, res) => {
  res.send('I\'m alive');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'page/build', 'index.html'));
});

app.listen(PORT, (port) => {
  console.log(`Listening on port ${PORT}`);
});
