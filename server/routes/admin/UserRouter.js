const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/avatarImg' });
const userController = require('../../controllers/admin/userController');
const router = express.Router();

/* GET users listing. */
router.post('/login', userController.login);

// update
router.post('/update', upload.single('file'), userController.update);
// add
router.post('/add', upload.single('file'), userController.add);
// 用户列表增删改查
router.get('/list', userController.getList);
router.get('/list/:id', userController.getList);
router.delete('/list/:id', userController.delList);
router.put('/list/:id', userController.putList);

module.exports = router;
