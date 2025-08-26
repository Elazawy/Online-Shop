const productModel = require('../models/products.model');

exports.getAdd = (req, res, next) => {
    const errors = req.flash('validationErrors'); 
    console.log(errors);
    res.render('add-product', {
        validationErrors: errors,
        isUser: true,
        isAdmin: true,
        username: req.session.username,
    });
}
exports.postAdd = (req, res, next) => {
    productModel.addProduct({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.imageName
    })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}
