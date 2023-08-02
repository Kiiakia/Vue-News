const userModel = require('../../models/UserModel');

const userService = {
    login: async({username, password}) => {
        return userModel.find({
            username:username,
            password:password
        })
    },
    updata:async({
        _id,username, sex, introduction, avatar
    }) => {
        if(avatar){
            return userModel.updateOne({_id}, {
                username, sex, introduction, avatar
            })
        }else{
            return userModel.updateOne({_id}, {
                username, sex, introduction
            })
        }
        
    }
}

module.exports = userService;