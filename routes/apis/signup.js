const express = require('express');
const route = express.Router();
const {findUser} = require('../../pg_database/queries/find_user')
const {createUser} = require('../../pg_database/mutation/create_user')

const {body, validationResult, query, param} = require('express-validator');


route.post('/signup',
    body('username').trim().isEmail().isLength({min: 6}).escape(),
    body('name').trim().notEmpty().isString().escape(),
    body('password').notEmpty().isLength({min: 6}).isString().escape(),
    ((req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: 'Invalid request'});
        }

        if (!req.body) {
            res.status(401)
            res.send({error: "Invalid request"})
        }
        const {username, name, password} = req.body

        findUser({username: username}, (err, user) => {
            if (err || user) {
                res.status(401)
                return res.send({error: "Email has been used."})
            } else {
                // console.log(req.body)
                createUser({
                    name: name,
                    email: username,
                    password: password
                }, (err, data, other) => {
                    if (err) {
                        console.log(err)
                        res.status(401)
                        return res.send({error: "Invalid request"})
                    } else {
                        return res.send({status: 'ok'})
                    }
                })
            }
        })
    })
);

module.exports = route;
