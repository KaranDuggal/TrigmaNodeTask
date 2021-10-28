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
        // Forget Password
        this.schemas.forgotPassword = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).length(6).required(),
        }).required();
        // Set Password
        this.schemas.changePassword = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).length(6).required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ "any.only": `Confirm password not equal to password` }),
        }).required();
    }
}
module.exports = ValidatorService

