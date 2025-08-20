const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;
