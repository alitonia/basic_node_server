const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require("helmet");

const {passportConfig} = require('./middlewares/passport/passport.js')
const {configSession} = require('./middlewares/session/express_session')

const PORT = process.env.PORT || 80;
const public_asset_path = 'client/public'
const app = express();

app.use(require('./middlewares/rate_limiter/rate_limiter_middleware'))
// app.use(helmet());


app.use(bodyParser.urlencoded({extended: true}));

//special paths that need increase in upload capacity
app.use('/admin/products',
    bodyParser.json({
        limit: '300kb',
    })
)

app.use('/admin/categories',
    bodyParser.json({
        limit: '300kb',
    })
)

app.use(bodyParser.json());


//middlewares
// configSession(app)
passportConfig(app)

app.use(require('./middlewares/cacheControl/cacheControl.js'))

app.use(require('./middlewares/redis_cache/redis_get_middleware'))

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

//admin
app.use(require('./routes/admins/login.js'))

app.use(require('./routes/admins/viewOrders'))
app.use(require('./routes/admins/getOrderById'))
app.use(require('./routes/admins/viewProducts'))
app.use(require('./routes/admins/viewCategories'))
app.use(require('./routes/admins/viewCustomers'))

app.use(require('./routes/admins/updateOrder'))
app.use(require('./routes/admins/updateProduct'))
app.use(require('./routes/admins/updateCategory'))
app.use(require('./routes/admins/updateCustomer'))


app.use(require('./routes/admins/addProduct'))
app.use(require('./routes/admins/addCategory'))


app.get('/test', (req, res) => {
    res.send("Test route")
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, 'home.html'))
})

app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, 'doc.html'))
})


app.use(express.static(path.join(__dirname, public_asset_path), {
    maxAge: 1000 * 60 * 60 * 24 * 265,
    etag: false,
    immutable: true
}));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, public_asset_path, '404.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
