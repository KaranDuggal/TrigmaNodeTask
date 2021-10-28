const Joi = require("joi").extend(require("@joi/date"));

class ValidatorService {
    constructor() {
        this.schemas = {};
        this.initializeScemas();
    }
    initializeScemas() {
        // AUTH
        this.schemas.register = Joi.object({
            fullName: Joi.string().required(),
            DOB: Joi.date().utc().format("YYYY-MM-DD").less('now'),
            gender: Joi.string().valid('mail','femail').required(),
            email: Joi.string().email().required(),
            mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/, { name: 'numbers' }).required(),
            password: Joi.string().length(5).required(),
            status: Joi.boolean().required(),
            // confirmEmail: Joi.string().valid(Joi.ref('email')).required().messages({ "any.only": `Confirm email not equal to email` }),
        }).required();
        // Login
        this.schemas.Login = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required();
        // Set Password
        this.schemas.MobSetPassword = Joi.object({
            otp: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).length(4).allow(null, ''),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ "any.only": `Confirm password not equal to password` }),
        }).required();
        // Forget Password
        this.schemas.MobForgetPassword = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).length(4).required(),
        }).required();
        // Forget Password
        this.schemas.MobVerifyOTP = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).length(4).required(),
        }).required();
        this.schemas.MobUserUpdate = Joi.object({
            firstName: Joi.string().allow('', null),
            lastName: Joi.string().allow('', null),
            // email: Joi.string().email().allow('', null),
            dob: Joi.date().utc().format("YYYY-MM-DD").less('now'),
            gender: Joi.string().valid("mail","femail"),
            linkedAccount: Joi.array().unique().items(Joi.string()),
            cliftonStrenghts:Joi.array().unique().items(Joi.string()),
            disc:Joi.array().unique().items(Joi.string()),
            gift:Joi.array().unique().items(Joi.string()),
            passions:Joi.string().allow('',null)
        }).required();
    }
}
module.exports = ValidatorService

