const authModel = require('../models/auth.model');

exports.getSignup = (req, res, next) => {
    res.render('signup');
}

exports.postSignup = (req, res, next) => {
    const { username, email, password} = req.body;
    authModel.createNewUser(username, email, password)
        .then( () => {
            res.redirect('login')
        })
        .catch( err => {
            res.redirect('signup');
        })
}

exports.getLogin = (req, res, next) => {
    res.render('login');
}

exports.postLogin = (req, res, next) => {
    authModel
        .login(req.body.email, req.body.password)
        .then( (id) => {
            req.session.userId = id;
            res.redirect('/');
        })
        .catch( err => {
            console.log(err);
            res.redirect('login');
        })
}
