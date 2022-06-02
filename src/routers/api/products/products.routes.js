import express from 'express';
import auth from '../../../middlewares/adminAuth.js';
const productRoutes = express.Router();
import {
    getProductsController,
    generateProducts,
    addProductController,
    updProductController,
    deleteProductController
} from '../../../controllers/products/products.controller.js';

productRoutes.get('/:id?', getProductsController);
productRoutes.post('/', auth, addProductController);
productRoutes.post('/generate', generateProducts);
productRoutes.put('/:id', auth, updProductController);
productRoutes.delete('/:id', auth, deleteProductController);


export default productRoutes;