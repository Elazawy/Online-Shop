const productsModel = require('../models/products.model');

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
            products, category
        })
    })
}