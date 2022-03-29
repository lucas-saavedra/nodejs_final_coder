import express from 'express';
import auth from '../../middlewares/authMiddleware.js';
const productRouter = express.Router();
import {
    getProductsController,
    addProductController,
    updProductController,
    deleteProductController
} from '../../controllers/products.controller.js';

productRouter.get('/:id?', getProductsController);
productRouter.post('/', auth, addProductController);
productRouter.put('/:id', auth, updProductController);
productRouter.delete('/:id', auth, deleteProductController);


export default productRouter;