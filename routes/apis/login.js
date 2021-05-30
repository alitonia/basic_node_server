const express = require('express');
const route = express.Router();
const passport = require('passport')
const {generateAccessToken} = require("../../utils/generateToken");

route.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        console.log(user)
        if (!user) {
            res.status(403)
            return res.send(({
                error: 'Invalid arguments'
            }))
        }
        // req.login(user, {session: false}, async (error) => {
        //     if (error) return next(error)


        const body = {id: user.id, email: user.username};
        const token = generateAccessToken({user: body});
        // return res.redirect(`/home.html?token=${token}`)
        return res.send(({
            token: token
        }))
        // })
    })(req, res, next);
});

module.exports = route;
