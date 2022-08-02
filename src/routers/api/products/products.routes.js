import { Router } from 'express';
import ProductController from '../../../controllers/products.controller.js';


const router = Router();

class ProductRoutes {
    constructor() {
        this.controller = new ProductController();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/:id?`, this.controller.getProductsController);
        router.post(`${prefix}/`, this.controller.addProductController);
        router.put(`${prefix}/:id`, this.controller.updProductController);
        router.delete(`${prefix}/:id`, this.controller.deleteProductController);
        return router;
    }
}

export default new ProductRoutes();