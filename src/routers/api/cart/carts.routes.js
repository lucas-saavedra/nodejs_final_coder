import express from 'express';
import CartsController from '../../../controllers/carts.controllers.js';

const router = express.Router();


class CartRoutes {
    constructor() {
        this.controller = new CartsController();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/`, this.controller.getCarForSession);
        router.post(`${prefix}/clear`, this.controller.clearCart);
        router.post(`${prefix}/`, this.controller.addNewProductToCartController);
        router.delete(`${prefix}/:productId`, this.controller.delProductFromCartController);
        return router;
    }
}



export default new CartRoutes();