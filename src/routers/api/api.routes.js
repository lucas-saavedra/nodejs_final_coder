import express from "express";
import authRoutes from "./authRoutes/auth.routes.js";
import productRoutes from "./products/products.routes.js";
import cartsRoutes from "./cart/carts.routes.js";
import isAuth from "../../middlewares/isAuth.js";
import orderRoutes from "./orders/orders.routes.js";

const router = express.Router();

router.use('/auth', authRoutes);


router.use(isAuth, productRoutes.initialize('/productos'));
router.use(isAuth, cartsRoutes.initialize('/carrito'));
router.use(isAuth, orderRoutes.initialize('/checkout'));



export default router;