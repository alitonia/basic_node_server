const express = require('express');
const route = express.Router();
const passport = require('passport')
const {generateAccessToken} = require("../../utils/generateToken");

route.get('/admin/login', function (req, res, next) {
        res.send('hello')
    }
)

route.post('/admin/login', function (req, res, next) {
    passport.authenticate('local_admin', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.status(403)
            return res.send(({
                error: 'Invalid arguments'
            }))
        }

        const body = {admin_id: user.id, name: user.name};

        const token = generateAccessToken({user: body});
        res.header('Set-Cookie', `admin_token=${token}; SameSite=Strict;`)
        return res.send(({
            token: token
        }))
        // })
    })(req, res, next);
});

module.exports = route;
