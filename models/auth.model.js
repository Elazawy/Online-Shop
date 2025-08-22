const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = process.env.DB_URI;

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
        return User.findOne({email})
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
                
                resolve();
            })
            .catch(err => {
                
                reject(err)
            });
    })
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        return User.findOne({email})
            .then(async user => {
                if(!user || !(await bcrypt.compare(password, user.password))) {
                    reject('Invalid email or password');
                } else {
                    resolve(user._id);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}
