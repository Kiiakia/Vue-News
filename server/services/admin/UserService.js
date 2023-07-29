const userModel = require('../../models/UserModel');

const userService = {
    login: async({username, password}) => {
        return userModel.find({
            username:username,
            password:password
        })
    }
}

module.exports = userService;