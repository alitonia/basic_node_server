const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/pages/build')));

app.use(require('./routes/products.js'));
app.use(require('./routes/author.js'));
app.use(require('./routes/teapot.js'));

app.get('/*', ((req, res) => {
  res.sendFile(path.join(__dirname, 'client/pages/build', 'index.html'));
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
