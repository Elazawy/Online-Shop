const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
require('dotenv').config();
const mongoose = require('mongoose');
const flash = require('connect-flash')

const app = express();

mongoose.connect(process.env.DB_URI)
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server listen on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash());

// Make session store
const STORE = new SessionStore({
    uri: process.env.DB_URI,
    collection: 'sessions',
})
// Use middleware coming from session();
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    saveUninitialized: false,
    store: STORE,
    resave: false
}))

//View engine and ejs files directory
app.set('view engine', 'ejs'); 
app.set('views'); // Default

app.use('/', homeRouter);
app.use('/product', productRouter)
app.use('/', authRouter);