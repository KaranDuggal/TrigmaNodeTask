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
    this.Register = async (req, res) => {
        try {
            let register
            let isExist
            const validate = await validatorService.schemas.register.validate(req.body);
            if (validate.error) { throw validate.error.details[0].message };
            isExist = await dbService.find(UserModel, { email: validate.value.email});
            if (isExist[0]) { throw mobileMessages.USER_ALREADY_EXIST }
            validate.value.password = await bcryptjs.hash(validate.value.password, 10);
            register = await dbService.create(UserModel, validate.value);
            return res.status(200).json({ success: true, message: mobileMessages.AUTH_LOGIN, data: register });
        } catch (err) {
            console.log('err', err)
            return res.status(201).json({ success: false, message: err });
        }
    }
    this.Login = async (req, res) => {
        try {
            let isExist;
            let isPasswordRight
            const validate = await validatorService.schemas.Login.validate(req.body);
            if (validate.error) { throw validate.error.details[0].message };
            isExist = await dbService.find(UserModel, { email: validate.value.email });
            if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
            isPasswordRight = await bcryptjs.compare(validate.value.password, isExist[0].password);
            if (!isPasswordRight) { throw mobileMessages.AUTH_PASSWORD_NOT_MATCH };
            return res.status(200).json({ success: true, message: mobileMessages.AUTH_LOGIN, data: isExist[0], token: await tokenService.create({ _id: isExist[0]._id }, { /* expiresIn: "1h"  */ }) });
        } catch (err) {
            console.log('err', err)
            return res.status(200).json({ success: false, message: err });
        }
    }
    this.changePassword = async (req, res) => {
        try {
            let update
            let isExist;
            const validate = await validatorService.schemas.changePassword.validate(req.body);
            if (validate.error) { throw validate.error.details[0].message };
            isExist = await dbService.find(UserModel, { email: validate.value.email });
            if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
            if (isExist[0].otp !== validate.value.otp) { throw mobileMessages.AUTH_INVALID_OTP };
            validate.value.password = await bcryptjs.hash(validate.value.password, 10);
            update = await dbService.update(UserModel, { email: validate.value.email }, { password: validate.value.password, otp: "" });
            return res.status(200).json({ success: true, message: mobileMessages.AUTH_PASSWORD_SET, data: update });
        } catch (err) {
            console.log('err', err)
            return res.status(200).json({ success: false, message: err });
        }
    }
    this.forgotPassword = async (req, res) => {
        try {
            req.body.otp = `${Math.random().toFixed(6).substr(`-${6}`)}`;
            const validate = await validatorService.schemas.forgotPassword.validate(req.body);
            if (validate.error) { throw validate.error.details[0].message };
            const isExist = await dbService.find(UserModel, { email: validate.value.email, role: 'user' });
            if (!isExist[0]) { throw mobileMessages.USER_NOT_EXIST };
            const update = await dbService.update(UserModel, { email: validate.value.email}, { otp: validate.value.otp });
            // let HTML = `<h3>Email</h3> ${validate.value.email} <br><br><h3>OTP</h3> ${validate.value.otp} <br><br>`;
            // let subject = `forgetPassword`
            // await mailService.send({ email: isExist[0].email, html: HTML, subject: subject });
            return res.status(200).json({ success: true, message: mobileMessages.AUTH_FORGET_PASSWORD, data: update,otp :  validate.value.otp  });
        } catch (err) {
            console.log('err', err)
            return res.status(200).json({ success: false, message: err });
        }
    }
}

