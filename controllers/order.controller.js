const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model')

exports.getOrders = (req, res, next) => {
    orderModel.getAllOrders(req.session.userId)
        .then(orders => {
            res.render('order', {
                orders: orders,
                isUser: true,
                username: req.session.username,
                isAdmin: req.session.isAdmin,
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getAddress = (req, res, next) => {
    req.session.cartData = req.body
    res.render('address', {
        username: req.session.username,
        isUser: true,
        isAdmin: req.session.isAdmin,

    })
}
exports.getAddressForAllOrders = (req, res, next) => {
    res.render('addressAll', {
        username: req.session.username,
        isUser: true,
        isAdmin: req.session.isAdmin,

    })
}
exports.addOrder = (req, res, next) => {
    let data = req.session.cartData;
    delete req.session.cart;
    data.address = req.body.address;
    orderModel.addNewOrder({
        userId: req.session.userId,
        productName: data.productName,
        amount: data.amount,
        cost : data.price * data.amount,
        address: data.address,
    })
        .then(() => {
            cartModel.deleteItem(data.cartId)
        })
        .then(() => {
            res.redirect('/order');
        })
        .catch(err => {
            console.log(err);
        })
}
exports.orderAllCarts = (req, res, next) => {
    cartModel.getItemsbyUserId(req.session.userId)
        .then((carts) => {
            for(const cart of carts) {
                orderModel.addNewOrder( {
                    userId: req.session.userId,
                    productName: cart.name,
                    amount: cart.amount,
                    cost: cart.price * cart.amount,
                    address: req.body.address,
                })
                    .then(() => {
                        cartModel.deleteItem(cart._id)
                            .catch(err => console.log(err));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .then(() => {
            res.redirect('/order');
        })
        .catch(err => console.log(err));
}
exports.cancelOrder = (req, res, next) => {
    orderModel.deleteOrder(req.body.orderId)
        .then(() => {
            res.redirect('/order');
        })
        .catch(err => {
            console.log(err);
        })
}
exports.cancelAllOrders = (req, res, next) => {
    orderModel.deleteAllOrders(req.session.userId)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
}