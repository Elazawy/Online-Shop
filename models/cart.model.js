const mongoose = require('mongoose');
const {promise} = require("bcrypt/promises");
const authModel = require("../models/auth.model");

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    email: String,
    timeStamp: Number,
})

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        return CartItem.findOne({productId: data.productId})
            .then((cartItem) => {
                if(cartItem) {
                    return exports.editItem(cartItem._id, {amount : parseInt(cartItem.amount) + parseInt(data.amount)})
                        .then(() => resolve())
                        .catch(err => reject(err));
                } else {
                    authModel.getEmailByUserId(data.userId)
                        .then((email) => {
                            let item = new CartItem({...data, email});
                            return item.save()
                                .then(() => {
                                    resolve();
                                })
                                .catch((err) => {
                                    reject(err);
                                })
                        })
                        .catch(err => reject(err));
                }
            })
            .catch(err => reject(err));
    })
}
exports.getItemsbyUserId = (userId) => {
    return new Promise((resolve, reject) => {
        return CartItem.find({userId}, {}, {sort: {timeStamp: 1}})
            .then(items => {
                resolve(items);
            })
            .catch((err) => {
                reject(err);
            })
    })
}
exports.editItem = (cartId, newData) => {
    return new Promise((resolve, reject) => {
        return CartItem.updateOne({_id: cartId}, {amount: newData.amount})
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}
exports.deleteItem = (cartId) => {
    return new Promise((resolve, reject) => {
        return CartItem.deleteOne({_id: cartId})
            .then(() => {
                resolve();
            })
            .catch((err) => {
            reject(err);
            })
    })
}
exports.deleteAllItems = userId => {
    return new Promise((resolve, reject) => {
        return CartItem.deleteMany({userId})
            .then( () => {
                resolve();
            })
            .catch((err) => {
                console.error(err);
            })
    })
}