const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = 'mongodb://localhost:27017/online-shop';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', userSchema);

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return User.findOne({email});
            })
            .then(user => {
                if(user) {
                    reject('Email is used');
                } else {
                    return bcrypt.hash(password, 10)
                }
            })
            .then(hashedPassword => {
                let user = new User({
                    username: username,
                    email: email,
                    password : hashedPassword
                });
                return user.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            });
    })
}
