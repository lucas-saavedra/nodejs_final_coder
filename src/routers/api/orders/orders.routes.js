import express from 'express';
import OrdersController from '../../../controllers/orders.controllers.js';

const router = express.Router();

class OrderRoutes {
    constructor() {
        this.controller = new OrdersController();
    }

    initialize(prefix = "") {
        router.post(`${prefix}`, this.controller.checkoutOrderController);
        return router;
    }
}
export default new OrderRoutes();