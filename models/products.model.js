const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/online-shop';

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})

const  Product = mongoose.model('product', productSchema);

exports.getAllProducts = () =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({});
        })
            .then((products) => {
            mongoose.disconnect();
            resolve(products);
        })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            });
    })
}
exports.getFirstProduct = () =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.findOne({});
        }).then((products) => {
            mongoose.disconnect();
            resolve(products);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}
exports.getProductsByCategory = (category) =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({category});
        }).then((products) => {
            mongoose.disconnect();
            resolve(products);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            if(mongoose.Types.ObjectId.isValid(id)){
                return Product.findById(id);
            } else {
                return undefined;
            }
        }).then((product) => {
            mongoose.disconnect();
            resolve(product);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}
