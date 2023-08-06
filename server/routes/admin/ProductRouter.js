const express = require('express');
const multer = require('multer');
const productController = require('../../controllers/admin/ProductController')
const upload = multer({ dest: 'public/productImg' });
const router = express.Router();


router.post('/add', upload.single('file'), productController.add);
router.post('/list', upload.single('file'), productController.updateList);
router.get('/list', productController.getList);
router.get('/list/:id', productController.getList);
router.delete('/list/:id', productController.delList);
// router.put('/publish', productController.publish);

module.exports = router;
