const authModel = require('../models/auth.model');
const { validationResult } = require('express-validator');
const passport = require('../config/passport')

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        signupError: req.flash('emailExistError')[0],
        isAdmin: false,
        pageTitle: "Sign up"
    });
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        const { username, email, password} = req.body;
        authModel.createNewUser(username, email, password)
            .then( () => {
                res.redirect('login')
            })
            .catch( error => {
                if(error === "Email already exists") {
                    req.flash('emailExistError', error);
                }
                res.redirect('signup');
            })
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/signup');
    }
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: "Login"
    });
}

exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        return passport.authenticate('local', (err, user, info) => {
            if(err) {
                return next(err);
            }
            if(!user) {
                req.flash('authError', info.message);
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if(err) { return next(err) }
                return res.redirect('/');
            })
        })(req, res, next);
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/login');
    }
}
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}
