const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { User }  = require('../models/auth.model');
const { escapeXML } = require('ejs');
require('dotenv').config();

// Google Strategy
passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/cb"
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({googleId: profile.id});
    console.log(profile);
    if(!user) {
        // create new user
        const newUser = new User({
            username: profile.displayName,
            email: null,
            googleId: profile.id,
            password: null
        });
        await newUser.save();
        return done(null, newUser);
    } else {
        return done(null, user);
    }
})
)
// GitHub Strategy
passport.use( new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIEINT_SECRET,
    callbackURL: "/auth/github/cb"
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({githubId: profile.id});
    if(!user) {
        // create new user
        const newUser = new User({
            username: profile.username,
            email: null,
            githubId: profile.id,
            password: null
        });
        await newUser.save();
        return done(null, newUser);
    } else {
        return done(null, user);
    }
})
)
 // Local Strategy
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