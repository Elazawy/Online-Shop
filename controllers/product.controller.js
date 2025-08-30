const productsModel = require('../models/products.model');

exports.getFirstProduct = (req, res, next) => {
    productsModel.getFirstProduct()
    .then(product => {
        res.render('product', {
            product : product,
            isAdmin: req.session.isAdmin,

        })
    })
}

exports.getProductById = (req, res, next) => {
    let id = req.params.id;
    productsModel.getProductById(id)
    .then(product => {
        res.render('product', {
            product : product,
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
            username: req.session.username,
            pageTitle: product.name
        })
    })
}
