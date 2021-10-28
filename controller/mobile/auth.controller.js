// ------------------ Packages -------------------------
const bcryptjs = require('bcryptjs');
// ------------------ Services -------------------------
const TokenService = require('../../services/token.services');
const tokenService = new TokenService();
const ValidatorService = require('../../services/validator/mobileValidator');
const validatorService = new ValidatorService();
const DbService = require('../../services/DB.services');
const dbService = new DbService();

// ------------------ Model -------------------------
const { UserModel } = require('../../models');
// ------------------ constant -------------------------
const mobileMessages = require('../../db/messages/mobile.messages');

module.exports = AuthController = function () {
    this.Signup = async (req, res) => {
        try {
            // let signup
            // let isExist
            // const validate = await validatorService.schemas.MobSignup.validate(req.body);
            // if (validate.error) { throw validate.error.details[0].message };
            // validate.value.token = await tokenService.create({ email: validate.value.email, role: validate.value.role }, { /* expiresIn: "1h"  */ })
            // isExist = await dbService.find(UserModel, { email: validate.value.email, role: validate.value.role });
            // if (isExist[0]) {
            //     if (isExist[0].isVerified) {
            //         throw mobileMessages.USER_ALREADY_EXIST
            //     } else {
            //         signup = await dbService.update(UserModel, { _id: isExist[0]._id }, validate.value);
            //         signup = await dbService.find(UserModel, { _id: isExist[0]._id });signup = JSON.parse(JSON.stringify(signup[0]));
            //     }
            // } else {
            //     signup = await dbService.create(UserModel, validate.value);
            //     signup = JSON.parse(JSON.stringify(signup));
            // }
            // /*  // delete signup.__v; */
            // let HTML = `<h3>Email</h3> ${signup.email} <br><br><h3>Token</h3> ${signup.token} <br><br>`
            // let subject = `SignUp`
            // await mailService.send({ email: signup.email, token: signup.token, html: HTML, subject: subject });
            return res.status(200).json({ success: true, message: mobileMessages.AUTH_LOGIN, data: signup });
        } catch (err) {
            console.log('err', err)
            return res.status(201).json({ success: false, message: err });
        }
    }
    // this.Login = async (req, res) => {
    //     try {
    //         const validate = await validatorService.schemas.MobLogin.validate(req.body);
    //         if (validate.error) { throw validate.error.details[0].message };
    //         const isExist = await dbService.find(UserModel, { email: validate.value.email, role: 'user' });
    //         if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
    //         if (!isExist[0].isVerified) { throw mobileMessages.USER_NOT_VERIFY };
    //         if (!isExist[0].isPasswordSet) { throw mobileMessages.USER_PASSWORD_NOT_SET };
    //         const isPasswordRight = await bcryptjs.compare(validate.value.password, isExist[0].password);
    //         if (!isPasswordRight) { throw mobileMessages.AUTH_PASSWORD_NOT_MATCH };
    //         return res.status(200).json({ success: true, message: mobileMessages.AUTH_LOGIN, data: isExist[0], token: await tokenService.create({ _id: isExist[0]._id }, { /* expiresIn: "1h"  */ }) });
    //     } catch (err) {
    //         console.log('err', err)
    //         return res.status(200).json({ success: false, message: err });
    //     }
    // }
    // this.verify = async (req, res) => {
    //     try {
    //         const validate = await validatorService.schemas.MobVerify.validate(req.body);
    //         if (validate.error) { throw validate.error.details[0].message };
    //         const tokenData = await tokenService.decodedToken(validate.value.token);
    //         const isExist = await dbService.find(UserModel, { email: validate.value.email, role: 'user' });
    //         if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
    //         if (isExist[0].token != validate.value.token) { throw mobileMessages.AUTH_INVALID_TOKEN }
    //         const update = await dbService.update(UserModel, { email: validate.value.email, role: 'user' }, { token: "", isVerified: true })
    //         return res.status(200).json({ success: true, message: mobileMessages.AUTH_VERIFY, data: update });
    //     } catch (err) {
    //         console.log('err', err)
    //         return res.status(200).json({ success: false, message: err });
    //     }
    // }
    // this.setPassword = async (req, res) => {
    //     try {
    //         const validate = await validatorService.schemas.MobSetPassword.validate(req.body);
    //         if (validate.error) { throw validate.error.details[0].message };
    //         const isExist = await dbService.find(UserModel, { email: validate.value.email, role: 'user' });
    //         if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
    //         if (!isExist[0].isVerified) { throw mobileMessages.USER_NOT_VERIFY };
    //         validate.value.password = await bcryptjs.hash(validate.value.password, 10);
    //         let update
    //         if (validate.value.otp) {
    //             if (isExist[0].otp != validate.value.otp) { throw mobileMessages.AUTH_INVALID_OTP }
    //             update = await dbService.update(UserModel, { email: validate.value.email, role: 'user' }, { password: validate.value.password, otp: '' });
    //         } else {
    //             update = await dbService.update(UserModel, { email: validate.value.email, role: 'user' }, { password: validate.value.password, isPasswordSet: true });
    //         }
    //         return res.status(200).json({ success: true, message: mobileMessages.AUTH_PASSWORD_SET, data: update });
    //     } catch (err) {
    //         console.log('err', err)
    //         return res.status(200).json({ success: false, message: err });
    //     }
    // }
    // this.forgetPassword = async (req, res) => {
    //     try {
    //         req.body.otp = randomString.generate({ length: 4, charset: 'numeric' })
    //         const validate = await validatorService.schemas.MobForgetPassword.validate(req.body);
    //         if (validate.error) { throw validate.error.details[0].message };
    //         const isExist = await dbService.find(UserModel, { email: validate.value.email, role: 'user' });
    //         if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
    //         const update = await dbService.update(UserModel, { email: validate.value.email, role: 'user' }, { otp: validate.value.otp });
    //         let HTML = `<h3>Email</h3> ${validate.value.email} <br><br><h3>OTP</h3> ${validate.value.otp} <br><br>`;
    //         let subject = `forgetPassword`
    //         await mailService.send({ email: isExist[0].email, html: HTML, subject: subject });
    //         return res.status(200).json({ success: true, message: mobileMessages.AUTH_FORGET_PASSWORD, data: update });
    //     } catch (err) {
    //         console.log('err', err)
    //         return res.status(200).json({ success: false, message: err });
    //     }
    // }
    // this.verifyOTP = async (req, res) => {
    //     try {
    //         const validate = await validatorService.schemas.MobVerifyOTP.validate(req.body);
    //         if (validate.error) { throw validate.error.details[0].message };
    //         const isExist = await dbService.find(UserModel, { email: validate.value.email, role: 'user' });
    //         if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
    //         if (isExist[0].otp != validate.value.otp) { throw mobileMessages.AUTH_INVALID_OTP }
    //         return res.status(200).json({ success: true, message: mobileMessages.AUTH_VERIFY_OTP, data: 1 });
    //     } catch (err) {
    //         console.log('err', err)
    //         return res.status(200).json({ success: false, message: err });
    //     }
    // }
}

