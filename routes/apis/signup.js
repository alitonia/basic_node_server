const express = require('express');
const route = express.Router();
const {findUser} = require('../../pg_database/queries/find_user')
const {createUser} = require('../../pg_database/mutation/create_user')
const passport = require('passport')

route.post('/signup',
    ((req, res) => {
        if (!req.body) {
            res.status(401)
            res.send("Invalid request")
        }
        const {username, name, password} = req.body

        findUser({username: username}, (err, user) => {
            if (err || user) {
                res.status(401)
                res.send("Email has been used.")
            } else {
                createUser({
                    name: name,
                    email: username,
                    password: password
                }, (err, data, other) => {
                    if (err) {
                        console.log(err)
                        res.status(401)
                        res.send("Invalid request 1")
                    } else {
                        res.send('ok')
                    }
                })
            }
        })
    })
);

module.exports = route;
