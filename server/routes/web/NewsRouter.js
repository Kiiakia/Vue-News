const express = require('express');
const newsController = require('../../controllers/web/NewsController')
const router = express.Router();

// add
router.get('/list', newsController.getList);
router.get('/list/:id', newsController.getList);
router.get('/toplist', newsController.getTopList)

module.exports = router;
