const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/avatarImg' });
const userController = require('../../controllers/admin/userController');
const router = express.Router();

/* GET users listing. */
router.post('/user/login', userController.login);

// update
router.post('/user/update', upload.single('file'), userController.update);
// add
router.post('/user/add', upload.single('file'), userController.add);
// 用户列表增删改查
router.get('/user/list', userController.getList);
router.get('/user/list/:id', userController.getList);
router.delete('/user/list/:id', userController.delList);
router.put('/user/list/:id', userController.putList);

module.exports = router;
