const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {passportConfig} = require('./middlewares/passport/passport.js')
const {configSession} = require('./middlewares/session/express_session')

const PORT = process.env.PORT || 8080;
const public_asset_path = 'client/public'
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//middlewares
// configSession(app)
passportConfig(app)

// app.use(require('./middlewares/redis_cache/redis_get_middleware'))
app.use(require('./middlewares/rate_limiter/rate_limiter_middleware'))

// api
app.use(require('./routes/apis/product.js'))
app.use(require('./routes/apis/category.js'));
app.use(require('./routes/apis/categories.js'));
app.use(require('./routes/apis/products'))
app.use(require('./routes/apis/reviews.js'))


// secured
app.use(require('./routes/apis/addProductToCart.js'))
app.use(require('./routes/apis/buy.js'))
app.use(require('./routes/apis/getCurrentCart.js'))
app.use(require('./routes/apis/removeOrder.js'))
app.use(require('./routes/apis/viewOrderHistory.js'))
app.use(require('./routes/apis/viewOrderDetails.js'))


// login/signup
app.use(require('./routes/apis/login.js'))
app.use(require('./routes/apis/signup.js'))


// blog
app.use(require('./routes/etc/author.js'));
app.use(require('./routes/etc/teapot.js'));
app.use(require('./routes/etc/meme.js'));

app.get('/test', (req, res) => {
    res.send("Test route")
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, 'home.html'))
})

app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, 'doc.html'))
})


app.use(express.static(path.join(__dirname, public_asset_path)));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, '404.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
