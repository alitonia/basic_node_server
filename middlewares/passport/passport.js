const bcrypt = require("bcrypt");
const passport = require('passport');
const {findAdmin} = require("../../pg_database/queries/find_user");
const {TOKEN_SECRET} = require("../../config");
const LocalStrategy = require('passport-local').Strategy;
const {findUser} = require('../../pg_database/queries/find_user')

const getHash = (password, salt) => bcrypt.hash(password, salt);
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

exports.getHash = getHash;

exports.passportConfig = (app) => {
    passport.use(
        'jwt',
        new JWTstrategy(
            {
                secretOrKey: TOKEN_SECRET,
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    if (token.user && token.user.id) {
                        return done(null, token.user);
                    }
                    return done('invalid username or password')
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use(
        'jwt_admin',
        new JWTstrategy(
            {
                secretOrKey: TOKEN_SECRET,
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    // console.log(token)
                    if (token.user && token.user.admin_id) {
                        return done(null, token.user);
                    }
                    return done('invalid username or password')
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use('local', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (username, password, cb) {
            findUser({username: username}, function (err, user) {
                if (err) {
                    return cb(err, false, {message: 'Incorrect username or password'});
                }
                if (!user) {
                    return cb(null, false, {message: 'Incorrect username or password'});
                }
                getHash(password, user.salt).then((hash) => {
                    if (hash !== user.password_hash) {
                        return cb(null, false, {message: 'Incorrect username or password'});
                    } else {
                        return cb(null, user);
                    }
                }).catch(err => {
                    return cb(err, false, {message: 'Incorrect username or password'});
                })
            });
        }));

    passport.use('local_admin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (username, password, cb) {
            findAdmin({username: username}, function (err, user) {
                if (err) {
                    return cb(err, false, {message: 'Incorrect username or password'});
                }
                if (!user) {
                    return cb(null, false, {message: 'Incorrect username or password'});
                }
                getHash(password, user.salt).then((hash) => {
                    if (hash !== user.password_hash) {
                        return cb(null, false, {message: 'Incorrect username or password'});
                    } else {
                        return cb(null, user);
                    }
                }).catch(err => {
                    return cb(err, false, {message: 'Incorrect username or password'});
                })
            });
        }));

    passport.serializeUser(function (user, cb) {
        cb(null, 1);
    });

    passport.deserializeUser(function (id, cb) {
        findUser({id: id}, function (err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
}
