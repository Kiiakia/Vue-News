const express = require('express');
const userController = require('../../controllers/admin/userController');
const router = express.Router();

/* GET users listing. */
router.post('/user/login', userController.login);


module.exports = router;
