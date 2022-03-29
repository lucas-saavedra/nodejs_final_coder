import express from 'express';
import productRouter from './products/products.routes.js';
import cartRouter from './cart/cart.routes.js';
import errorHandler from '../middlewares/errorHandlerMiddlerware.js';
const router = express.Router();

router.use('/productos', productRouter, errorHandler);
router.use('/carrito', cartRouter, errorHandler);

export default router;