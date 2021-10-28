// const Joi = require('joi');
require('dotenv-flow').config();

const constant = {
    //ENV File
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
}
module.exports = constant;