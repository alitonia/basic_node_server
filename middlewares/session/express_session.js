exports.configSession = (app) => {
    const expressSession = require('express-session')({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 3600}
    });

    app.use(expressSession);
}