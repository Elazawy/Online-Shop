const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const check = require('express-validator').check

router.get('/signup', authController.getSignup);
router.post('/signup',
    check('username')
        .not().isEmpty().withMessage('Username is required'),
    check('email')
        .not().isEmpty().withMessage("Email is required")
        .isEmail().withMessage("Not a valid email"),
    check('password')
        .not().isEmpty().withMessage("Password is required")
        .isLength({min:6}).withMessage("Password must be at least 6 characters"),
    check('confirmPassword')
        .not().isEmpty().withMessage("Confirm Password is required")
        .custom((confirmPassword, {req}) => {
        if(confirmPassword === req.body.password) return true;
        else throw 'Passwords must match';
    }),
    authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login',
    check('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage("Invalid Email"),
    check('password')
        .not().isEmpty().withMessage("Password is required")
        .isLength({min:6}).withMessage("Invalid Email or Password"),
    authController.postLogin);
router.all('/logout', authController.logout);
module.exports = router;
