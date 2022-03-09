const express = require('express');
const { auth } = require('../../utils/middleware')
const router = express.Router();
const {
    getProductsController,
    addProductController,
    updProductController,
    deleteProductController
} = require('../../controllers/products.controller');

router.get('/:id?', getProductsController);
router.post('/', auth, addProductController);
router.put('/:id', auth, updProductController);
router.delete('/:id', auth, deleteProductController);


module.exports = router;