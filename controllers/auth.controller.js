const authModel = require('../models/auth.model');
const { validationResult } = require('express-validator');

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        validationErrors: req.flash('validationErrors'),
    });
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        const { username, email, password} = req.body;
        authModel.createNewUser(username, email, password)
            .then( () => {
                res.redirect('login')
            })
            .catch( err => {
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
        validationErrors: req.flash('validationErrors')
    });
}

exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModel
            .login(req.body.email, req.body.password)
            .then( (id) => {
                req.session.userId = id;
                res.redirect('/');
            })
            .catch( err => {
                req.flash('authError', err)
                res.redirect('login');
            })
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/login');
    }

}
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}
