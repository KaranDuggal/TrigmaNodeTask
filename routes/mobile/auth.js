const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/mobile/auth.controller');
const authController = new AuthController();
const { Auth } = require('../../middleware/index');


router.route('/register')
    .post(authController.Register);

router.route('/login')
    .post(authController.Login);
  
router.route('/forgotpassword')
    .post(authController.forgotPassword);
    
router.route('/changepassword')
        .post(authController.changePassword);


module.exports = router;
