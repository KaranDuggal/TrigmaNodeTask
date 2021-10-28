const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/mobile/auth.controller');
const authController = new AuthController();
const { Auth } = require('../../middleware/index');


router.route('/signup')
    .post(authController.Signup);

// router.route('/login')
//     .post(authController.Login);

// router.route('/verify')
//     .post(authController.verify);

// router.route('/setpassword')
//     .post(authController.setPassword);

// router.route('/forgetpassword')
//     .post(authController.forgetPassword);

// router.route('/verifyotp')
//     .post(authController.verifyOTP);


module.exports = router;
