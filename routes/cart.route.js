const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const authGuard = require('./guards/auth.guard');
const check = require('express-validator').check;

router.get('/',
    authGuard.isAuth,
    cartController.getCart
);

router.post(
    '/',
    authGuard.isAuth,
    check('amount').not().isEmpty().withMessage('Amount is required')
    .isInt({min: 1}).withMessage("Amount must be greater than 0"),
    cartController.postCart
);

router.post('/save',
    authGuard.isAuth,
    check('amount').not().isEmpty().withMessage('Amount is required')
    .isInt({min: 1}).withMessage("Amount must be greater than 0"),
    cartController.postSave
);

router.post('/delete',
    authGuard.isAuth,
    cartController.postDelete
);
router.post('/deleteAll',
    authGuard.isAuth,
    cartController.postDeleteAll
)
module.exports = router;