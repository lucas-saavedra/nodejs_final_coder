import express from 'express';
const cartRouter = express.Router();
import {
    newCartController,
    getCartByIdController,
    addNewProductToCartController,
    deleteCartByIdController,
    delProductFromCartByIdsController
} from '../../controllers/carts.controller.js';

cartRouter.get('/', newCartController);
cartRouter.post('/:id/productos', addNewProductToCartController);
cartRouter.get('/:id/productos', getCartByIdController);
cartRouter.delete('/:id/productos/:id_prod', delProductFromCartByIdsController);
cartRouter.delete('/:id', deleteCartByIdController);

export default cartRouter;