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
cartRouter.get('/:id/productos', getCartByIdController);
cartRouter.post('/:id/productos', addNewProductToCartController);
cartRouter.delete('/:id', deleteCartByIdController);
cartRouter.delete('/:id/productos/:id_prod', delProductFromCartByIdsController);

export default cartRouter;