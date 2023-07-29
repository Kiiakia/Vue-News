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
    sex: Number,
    avatar: String,
    role: {
        type: Number,
    }
});

let userModel = mongoose.model('users', UserSchema);

module.exports = userModel