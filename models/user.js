const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        trim:true,
        required: true,
    },
    DOB: {
        type:Date,
        trim:true
    },
    gender:{
        type:String,
        enum:["mail","femail"]
    },
    email: {
        type:String,
        unique: true,
        trim:true,
        required: true,
    },
    mobileNo: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    otp: {
        type:String,
        default:""
    },
    status: {
        type:Boolean,
        required: true,
    },

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);

