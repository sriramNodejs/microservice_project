const router = require('express').Router();
const userController = require('../controllers/userController');
const {validate, validationRules} = require('../utils/validations')
const {accessTokenMiddleware} = require('../utils/tokenHelper')

// auth routes
router.post('/signup', validationRules.signup, validate ,userController.signup);

router.post('/login', validationRules.login, validate, userController.login);
// router.post('/logout');


router.post('/forgot-password', validationRules.forgotPassword, validate, userController.forgotPassword);

router.post('/verify-otp', validationRules.verifyOtp, validate, userController.verifyOtp);  // take new password

router.put('/update-password', validationRules.updatePassword, validate,accessTokenMiddleware, userController.updatePassword);


// // user routes
router.get('/profile', accessTokenMiddleware ,userController.profile);

// router.put('/profile/:id');

// router.delete('/profile/:id');


// router.post('/refresh-token', );


module.exports = router;