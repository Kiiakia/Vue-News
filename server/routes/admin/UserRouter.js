const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/avatarImg' });
const userController = require('../../controllers/admin/userController');
const router = express.Router();

/* GET users listing. */
router.post('/user/login', userController.login);

// update
router.post('/user/update', upload.single('file'), userController.update);


module.exports = router;
