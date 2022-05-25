import express from "express";
import authRoutes from "../api/auth/auth.routes.js";
import cartRoutes from "./cart/cart.routes.js";
import productRoutes from "./products/products.routes.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/productos', productRoutes);
router.use('/carrito', cartRoutes);

export default router;