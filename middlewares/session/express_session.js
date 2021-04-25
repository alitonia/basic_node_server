exports.configSession = (app) => {
    const expressSession = require('express-session')({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60000}
    });

    app.use(expressSession);
}