const jsonwebtoken = require('jsonwebtoken');
const secret = 'Kia'
const JWT = {
    generate:function(user, expireTime){
        return jsonwebtoken.sign(user, secret, {expiresIn:expireTime});
    },
    verify:function(token) {
        try{
            return jsonwebtoken.verify(token, secret);
        } catch(err){
            return false;
        }
    }
}

module.exports = JWT