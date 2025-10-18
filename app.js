const express = require('express');
const path = require('path');
// Import Routers
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/order.route');
const adminRouter = require('./routes/admin.route');

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
require('dotenv').config();
const mongoose = require('mongoose');
const flash = require('connect-flash')
const passport = require('./config/passport');

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
app.use(passport.initialize());
app.use(passport.session())

//View engine and ejs files directory
app.set('view engine', 'ejs'); 
app.set('views'); // Default

app.use('/cart', cartRouter);
app.use('/', homeRouter);
app.use('/product', productRouter)
app.use('/', authRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

app.use((error, req, res, next) => {
    res.redirect('/error');
})

app.get('/error', (req, res) => {
    res.status(500);
    res.render('error',{
        isUser: req.session.userId,
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        pageTitle: "Error"
    });
})
app.get('/not-admin', (req, res) => {
    res.status(403);
    res.render('not-admin', {
        isUser: req.session.userId,
        username: req.session.username,
        isAdmin: false,
        pageTitle: "Error",
    });
})
app.use((req, res, next) => {
    res.status(404);
    res.render('not-found', {
        isUser: req.session.userId,
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        pageTitle: "404 Not Found",
    })
})