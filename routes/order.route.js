const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const {isAuth} = require("./guards/auth.guard");

router.get('/', isAuth,
    orderController.getOrders
)
router.post('/address', isAuth,
    orderController.getAddress
)
router.post('/addressAll', isAuth,
    orderController.getAddressForAllOrders
)
router.post('/add',
    isAuth,
    orderController.addOrder
)
router.post('/cancel',
    isAuth,
    orderController.cancelOrder
)
router.post('/cancelAll',
    isAuth,
    orderController.cancelAllOrders
)
router.post('/orderall',
    isAuth,
    orderController.orderAllCarts
)

module.exports = router;