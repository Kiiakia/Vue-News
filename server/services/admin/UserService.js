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
    },
    add:async({
        username, sex, introduction, avatar, password, role
    }) => {
        return userModel.create({
            username, sex, introduction, avatar, password, role
        });
    },
    getList: async({_id}) => {
        return _id 
            ? userModel.find({_id}, ['username', 'role', 'introduction', 'password'])
            : userModel.find({}, ['username', 'role', 'sex', 'introduction', 'avatar']);
    },
    delList: async({_id}) => {
        return userModel.deleteOne({_id});
    },
    putList: async(body) => {
        return userModel.updateOne({_id:body._id}, body);
    }
}

module.exports = userService;