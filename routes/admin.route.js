const router = require('express').Router();
const check = require('express-validator').check;
const adminController = require('../controllers/admin.controller');
const adminGuard = require('./guards/admin.guard');
const multer = require('multer');
const checkImage = require('../middlewares/checkImageErrors');
const { validationResult } = require('express-validator');

router.get('/add', adminGuard, adminController.getAdd)

module.exports = router;

router.post('/add',
    adminGuard,
    checkImage.checkImageErrors,
    check('name').not().isEmpty().withMessage('Name is required'),
    check('price').not().isEmpty().withMessage('Price is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('category').not().isEmpty().withMessage('Category is required'),
    (req, res, next) => {
        const errors = validationResult(req).array();

        if (req.fileValidationError) {
            errors.push({msg: req.fileValidationError, param: "image"});
        }
        if (errors.length > 0) {
            req.flash("validationErrors", errors);
            return res.redirect("/admin/add");
        }
        next();
    },
    adminController.postAdd
)

router.get('/orders',
    adminGuard,
    adminController.getOrders
)
router.post('/orders',
    adminGuard,
    adminController.getOrdersByEmail
)
router.post('/orders/edit',
    adminGuard,
    adminController.editOrder
)
