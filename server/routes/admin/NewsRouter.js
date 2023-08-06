const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/newsImg' });
const newsController = require('../../controllers/admin/NewsController')
const router = express.Router();

// add
router.post('/add', upload.single('file'), newsController.add);
router.post('/list', upload.single('file'), newsController.updateList);
router.get('/list', newsController.getList);
router.get('/list/:id', newsController.getList);
router.delete('/list/:id', newsController.delList);
router.put('/publish', newsController.publish);

module.exports = router;
