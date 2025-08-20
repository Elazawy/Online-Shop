const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route');
const app = express();

// Used MiddleWares
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

//View engine and ejs files directory
app.set('view engine', 'ejs'); 
app.set('views'); // Default

app.use('/', homeRouter);
app.use('/product', productRouter)
app.use('/', authRouter);

app.listen(3001, () => {
    console.log('Server listen on port 3001');
})