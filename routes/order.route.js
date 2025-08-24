const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const {isAuth} = require("./guards/auth.guard");

router.post('/addOrder',
    isAuth,
    orderController.addOrder
)

module.exports = router;