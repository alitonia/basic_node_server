const express = require('express');
const route = express.Router();
const passport = require('passport')
const {body, validationResult, query, param} = require('express-validator');
const {generateAccessToken} = require("../../utils/generateToken");

route.post(
    '/login',
    body('email').trim().notEmpty().isEmail().escape(),
    body('password').trim().notEmpty().isLength({min: 6}).escape(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: 'Invalid username or password'});
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user || user.status !== 'active') {
                res.status(403)
                return res.send(({
                    error: 'Invalid username or password'
                }))
            }

            const body = {id: user.id, email: user.username};
            const token = generateAccessToken({user: body});
            res.header('Set-Cookie', `token=${token}; SameSite=Strict;`)
            return res.send(({
                token: token
            }))
            // })
        })(req, res, next);
    });

module.exports = route;
