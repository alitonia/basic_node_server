const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const public_asset_path = 'client/public'

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// api
app.use(require('./routes/apis/categories.js'));
app.use(require('./routes/apis/products'))

// blog
app.use(require('./routes/etc/author.js'));
app.use(require('./routes/etc/teapot.js'));
app.use(require('./routes/etc/meme.js'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, 'doc.html'))
})

app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, 'doc.html'))
})


app.use(express.static(path.join(__dirname, public_asset_path)));



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
