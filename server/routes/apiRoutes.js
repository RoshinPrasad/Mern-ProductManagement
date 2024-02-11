const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/products/:id', productController.getProductById);
router.get('/products', productController.listProducts);
router.post('/cart', productController.addToCart);
router.get('/cart', productController.getCartItems); 
router.put('/cart/:itemId', productController.updateCartQuantity);

module.exports = router;
