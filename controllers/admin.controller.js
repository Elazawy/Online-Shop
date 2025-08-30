const productModel = require('../models/products.model');
const orderModel = require('../models/order.model');
exports.getAdd = (req, res, next) => {
    const errors = req.flash('validationErrors'); 
    res.render('add-product', {
        validationErrors: errors,
        isUser: true,
        isAdmin: true,
        username: req.session.username,
        pageTitle: "Add Product",
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
        .catch(err => next(err));
}

exports.getOrders = (req, res, next) => {
    if (req.query.status){
        console.log(req.query.status);
        orderModel.getOrdersByStatus(req.query.status)
            .then(orders => {
                res.render('manage', {
                    isUser: true,
                    username: req.session.username,
                    isAdmin: req.session.isAdmin,
                    orders: orders,
                    pageTitle: "Orders"
                });
            })
            .catch(err => next(err));
    }
    else {
        orderModel.getAllOrdersForAdmin()
            .then(orders => {
                res.render('manage', {
                    isUser: true,
                    username: req.session.username,
                    isAdmin: req.session.isAdmin,
                    orders: orders,
                    pageTitle: "Manage Orders"
                })
            })
            .catch(err => next(err));
    }
}
exports.getOrdersByEmail = (req, res, next) => {
    orderModel.getOrdersByEmail(req.body.email)
        .then(orders => {
            res.render('manage', {
                isUser: true,
                username: req.session.username,
                isAdmin: req.session.isAdmin,
                orders: orders,
                pageTitle: "Orders"
            });
        })
        .catch(err => next(err));
}
exports.editOrder = (req, res, next) => {
    orderModel.editOrderStatusById(req.body.id, req.body.status)
        .then(() => {
            res.redirect('/admin/orders');
        })
        .catch(err => next(err));
}