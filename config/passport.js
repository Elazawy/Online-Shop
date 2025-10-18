const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User }  = require('../models/auth.model');

passport.use( new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if(!user) {
                return done(null, false, { message: 'Invalid email or password'});
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return done(null, false, {message: 'Invalid email or password'});
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser( async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
})

module.exports = passport