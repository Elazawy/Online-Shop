const mongoose = require('mongoose');

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
        return Product.find({})
            .then((products) => {
                resolve(products);
            })
            .catch(err => {
                reject(err)
            });
    })
}
exports.getFirstProduct = () =>{
    return new Promise((resolve, reject) => {
        return Product.findOne({})
            .then((products) => {
                
                resolve(products);
            }).catch(err => {
                
                reject(err)
            });
    })
}
exports.getProductsByCategory = (category) =>{
    return new Promise((resolve, reject) => {
        return Product.find({category})
            .then((products) => {
                
                resolve(products);
            }).catch(err => {
                
                reject(err)
            });
    })
}

exports.getProductById = (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return Product.findById(id).exec();
    } else {
        return Promise.resolve(undefined);
    }
};
exports.addProduct = (data) => {
    return new Promise((resolve, reject) => {
        let product = new Product(data);
        return product.save()
            .then((product) => { resolve() })
            .catch(err => { reject(err) })
    })
}