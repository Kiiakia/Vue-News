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
                ActionType: 'OK',
                data: {
                    username: result[0].username,
                    introduction:result[0].introduction,
                    sex: result[0].sex,
                    avatar: result[0].avatar,
                    role: result[0].role
                }
            });
        }else{
            res.send({
                errCode: -1,
                errMsg: '用户名与密码不匹配'
            });
        }
    },
    update: async(req, res) => {
        // console.log(req.body);
        // console.log(req.file);
        const {username, sex, introduction} = req.body;
        // 不需要加上public，加上反而不能访问
        const avatar = req.file ? `/avatarImg/${req.file.filename}`: "";
        const {authorization} = req.headers;
        const token = authorization.split(' ')[1];
        const _id = JWT.verify(token)._id;
        await userService.updata({
            _id,username, sex:Number(sex), introduction, avatar
        })
        if(avatar){
            res.send({
                ActionType: 'OK',
                data:{
                    username, sex:Number(sex), introduction, avatar
                }
            })
        }else{
            res.send({
                ActionType: 'OK',
                data:{
                    username, sex:Number(sex), introduction
                }
            })
        }
    },
    add: async(req, res) => {
        const {username, sex, introduction, password, role} = req.body;
        // 不需要加上public，加上反而不能访问
        const avatar = req.file ? `/avatarImg/${req.file.filename}`: "";

        await userService.add({
            username, sex:Number(sex), introduction, avatar, password, role:Number(role)
        })
        res.send({
            ActionType: 'OK'
        });
    },
    getList: async(req, res) => {
        let result = await userService.getList({_id:req.params.id});
        res.send({
            ActionType:'OK',
            data:result
        })
    },
    delList: async(req, res) => {
        let id = req.params.id;
        await userService.delList({_id:id});
        res.send({
            ActionType:'OK'
        })
    },
    putList: async(req, res) => {
        // console.log(req.body);
        await userService.putList(req.body);
        res.send({
            ActionType:'OK'
        })
    }
}

module.exports = userController;