const bcrypt = require("bcrypt");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {findUser} = require('../../pg_database/queries/find_user')

const getHash = (password, salt) => bcrypt.hash(password, salt)

exports.passportConfig = (app) => {
    passport.use(new LocalStrategy(
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
