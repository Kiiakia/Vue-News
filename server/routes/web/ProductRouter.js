const express = require('express');
const productController = require('../../controllers/web/ProductController')
const router = express.Router();

// add
router.get('/list', productController.getList);
router.get('/list/:id', productController.getList);

module.exports = router;
