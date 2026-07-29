const router = require('express').Router();
const userController = require('../controllers/userController');

// auth routes
router.post('/signup', userController.signup);

// router.post('/login');
// router.post('/logout');
// router.post('/forgot-password');

// router.post('/verify-otp');  // take new password

// router.put('/update-password');


// // user routes
// router.get('/profile');

// router.put('/profile/:id');

// router.delete('/profile/:id');


// router.post('/refresh-token');


module.exports = router;