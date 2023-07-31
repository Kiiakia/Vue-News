const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    introduction:String,
    sex: {
        type: Number,
        default: 0 // 0:保密 1：男 2：女
    },
    avatar: String,
    role: {
        type: Number,  // 1：admin 2：commonUser
    }
});

let userModel = mongoose.model('users', UserSchema);

module.exports = userModel