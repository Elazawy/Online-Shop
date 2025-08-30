const mongoose = require("mongoose");
const {reject} = require("bcrypt/promises");
const Schema = require('mongoose').Schema;

const orderSchema = new Schema({
    userId: String,
    productName: String,
    amount: Number,
    cost: Number,
    address: String,
    email: String,
    status: {
        type: String,
        default: 'Pending',
    },
    timeOrderedIn: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('Order', orderSchema);

exports.getAllOrders = (userId) => {
    return new Promise((resolve, reject) => {
        return Order.find({ userId }, {}, {sort: {timeOrderedIn: 1}})
            .then(orders => resolve(orders))
            .catch(err => reject(err));
    })
};
exports.getOrdersByStatus = (status) => {
    return new Promise((resolve, reject) => {
        return Order.find({ status })
            .then(orders => resolve(orders))
            .catch(err => reject(err));
    })
}
exports.addNewOrder = (data) => {
    return new Promise((resolve, reject) => {
        const order = new Order(data);
        return order.save()
            .then(() => { resolve(order); })
            .catch(err => reject(err));
    })
}
exports.deleteOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        Order.deleteOne({_id: orderId})
            .then(() => resolve())
            .catch(err => reject(err));
    })
}
exports.deleteAllOrders = (userId) => {
    return new Promise((resolve, reject) => {
        Order.deleteMany({ userId })
            .then(() => resolve())
            .catch(err => reject(err));
    })
}
exports.getAllOrdersForAdmin = () => {
    return new Promise((resolve, reject) => {
        return Order.find({})
            .then(orders => resolve(orders))
            .catch(err => reject(err));
    })
}
exports.getOrdersByEmail = (email) => {
    return new Promise((resolve, reject) => {
        return Order.find({email})
            .then(orders => resolve(orders))
            .catch(err => reject(err));
    })
}
exports.editOrderStatusById = (id, newStatus) => {
    return new Promise((resolve, reject) => {
        Order.updateOne({_id: id}, {status: newStatus})
            .then(() => resolve() )
            .catch(err =>  reject(err) )
    })
}