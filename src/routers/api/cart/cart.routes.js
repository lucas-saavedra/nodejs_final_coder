import express from 'express';
const cartRoutes = express.Router();

import {
    newCartController,
    getCartByIdController,
    addNewProductToCartController,
    deleteCartByIdController,
    checkoutCartController,
    delProductFromCartByIdsController
} from '../../../controllers/cart/carts.controller.js';


cartRoutes.get('/', newCartController);
cartRoutes.post('/:id/productos', addNewProductToCartController);
cartRoutes.get('/:id/productos', getCartByIdController);

cartRoutes.post('/:id/checkout', checkoutCartController);

cartRoutes.delete('/:id/productos/:id_prod', delProductFromCartByIdsController);

cartRoutes.delete('/:id', deleteCartByIdController);


export default cartRoutes;