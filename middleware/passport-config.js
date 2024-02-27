const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/model').Users; // Import your User model correctly

passport.use(new LocalStrategy(
    {
        usernameField: 'email', // Set the field to use as the username (email in this case)
        passwordField: 'password' // Set the field to use as the password
    },
    function(email, password, done) {
        User.findOne({ where: { email: email } }) // Use findOne method to find user by email
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
                // Assuming you have a method to compare passwords
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => done(err));
});

module.exports = passport;
