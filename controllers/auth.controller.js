const authModel = require('../models/auth.model');
const { validationResult } = require('express-validator');
const passport = require('../config/passport')
const { User } = require('../models/auth.model');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcypt = require('bcrypt');


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
                req.session.userId = req.user._id;
                req.session.username = req.user.username;
                req.session.isAdmin = req.user.isAdmin
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

exports.getForgotPassword = (req, res, next) => {
    res.render('forgot-password', {
        isUser: false,
        isAdmin: false,
        pageTitle: "Reset Password",
        authError: req.flash('authError')[0]
    });
}

exports.postForgotPassword = async (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!user) {
            req.flash('authError', 'No account with that email found.');
            return res.redirect('/forgot-password');
        }
        const token = crypto.randomBytes(32).toString('hex');
        user.reset_token = token;
        user.reset_token_expires = Date.now() + 3600000; // 1 hour
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You are receiving this because you have requested the reset of the password for your account.\n\n
Please click on the following link, or paste this into your browser to complete the process:\n\n
http://${req.headers.host}/reset-password?token=${token}&email=${user.email}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
                req.flash('authError', 'Error sending the email. Please try again later.');
                return res.redirect('/reset-password');
            }
        });
        res.render('check-email', {
            isUser: false,
            isAdmin: false,
            pageTitle: "Check Your Email"
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/reset-password');
    }
}

exports.getResetPassword = async (req, res, next) => {
    const { token, email } = req.query;
    const user = await User.findOne({ email: email, reset_token: token, reset_token_expires: { $gt: Date.now() } });
    if(!user) {
        req.flash('authError', 'Password reset link is invalid or has expired.');
        return res.redirect('/forgot-password');
    }   
    res.render('reset-password', {
        isUser: false,
        isAdmin: false,
        pageTitle: "Set New Password",
        email: email,
        token: token,
        validationErrors: req.flash('validationErrors'),
        authError: req.flash('authError')[0],
    });
}

exports.postResetPassword = async (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        const { token, email, password } = req.body;
        const user = await User.findOne({ email: email, reset_token: token, reset_token_expires: { $gt: Date.now() } });
        if(!user) {
            req.flash('authError', 'Password reset link is invalid or has expired.');
            return res.redirect('/forgot-password');
        }
        const matchedPassword = await bcypt.compare(password, user.password);
        if(matchedPassword) {
            req.flash('authError', 'New password must be different from the old password.');
            return res.redirect(`/reset-password?token=${token}&email=${email}`);
        }
        const hashedPassword = await bcypt.hash(password, 12);
        user.password = hashedPassword;
        user.reset_token = undefined;
        user.reset_token_expires = undefined;
        await user.save();
        res.redirect('/login');
    } else {
        req.flash('validationErrors', validationResult(req).array());
        return res.redirect(`/reset-password?token=${req.body.token}&email=${req.body.email}`);
    }
}
        