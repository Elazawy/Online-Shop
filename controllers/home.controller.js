const productsModel = require('../models/products.model');
const authModel = require('../models/auth.model');

exports.getHome = (req, res, next) => {
    let category = req.query.category;
    let productsPromise;
    if (category && category !== "All") {
        productsPromise = productsModel.getProductsByCategory(category);
    } else {
        productsPromise = productsModel.getAllProducts()
    }
    productsPromise.then(products => {
        res.render('index', {
            products, category,
            isUser: req.session.userId,
            validationError: req.flash('validationErrors')[0],
            username : req.session.username,
            isAdmin: req.session.isAdmin,
            pageTitle: "Home"
        })
    })
}