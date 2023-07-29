const userService = require('../../services/admin/UserService');
const JWT = require('../../util/JWT');

const userController = {
    login: async(req, res) => {
        // console.log(req.body);
        let result = await userService.login(req.body);

        /// 出错问题：上面的userService.login函数中没有return，所以默认返回undefined
        console.log(result);
        if(result.length != 0) {
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, '1d');

            res.header('Authorization', token);
            res.send({
                ActionType: 'OK'
            });
        }else{
            res.send({
                errCode: -1,
                errMsg: '用户名与密码不匹配'
            });
        }
    }
}

module.exports = userController;