// ========= services ===========
const DbService = require('../services/DB.services');
const dbService = new DbService();
// ========= NPM packages ===========
const jwt = require('jsonwebtoken');
const constant = require('../db/constant')
// ========= DB ===========
const { UserModel } = require('../models');
module.exports = (...args) => async (req, res, next) => {
    try {
        if (!args.length) { throw "Invalid Role" }
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, constant.JWT_SECRET);
        if (args[0] === 'isUser') {
            const User = await dbService.find(UserModel, { _id: decodedToken._id});
            if(User[0]){
                req.user = User[0];
                return next();
            }else{
                throw Error
            }
        }
        throw "Auth Failed!"
    } catch (error) {
        res.status(401).json({
            message: "Auth Failed! "
        })
    }
}