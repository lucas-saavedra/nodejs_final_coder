const express = require('express');
const router = express.Router();
const {
    newCartController,
    getCartByIdController,
    addNewProductToCartController,
    deleteCartByIdController,
    delProductFromCartByIdsController
} = require('../../controllers/carts.controller');


router.get('/:id/productos', getCartByIdController);
router.post('/', newCartController);
router.post('/:id/productos', addNewProductToCartController);
router.delete('/:id', deleteCartByIdController);
router.delete('/:id/productos/:id_prod', delProductFromCartByIdsController);

module.exports = router;