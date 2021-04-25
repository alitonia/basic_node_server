const express = require('express');
const route = express.Router();
const passport = require('passport')

route.post('/login',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/login.html?retry=true',
            successRedirect: '/chicken.html'
        }
    ),
);

module.exports = route;
