const express = require('express');
const userController = require('../../controllers/admin/userController');
const router = express.Router();

/* GET users listing. */
router.post('/user/login', userController.login);

// 测试
router.get('/user', (req, res) => {
    console.log(req);
    res.send({
        msg:'OK'
    })
});

module.exports = router;
