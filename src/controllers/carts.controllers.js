/* 
import { sendBuyConfirmationEmail } from '../../services/nodemailer.js';
import { sendSmsBuyConfirmation, sendWspBuyConfirmation } from '../../services/twilio.js'; */
import CartsApi from '../api/carts.api.js';
import ProductsApi from '../api/products.api.js';
import { MESSAGES, STATUS } from '../utils/constants.utils.js';
import CustomError from '../utils/customError.utils.js';

class CartsController {
    constructor() {
        this.cartApi = new CartsApi();
        this.productsApi = new ProductsApi();
    }
    getCartController = async (req, res, next) => {
        try {
            const userId = await req.user._id;
            let userCart = await this.cartApi.initUserCartApi(userId);
            return res.json({ success: true, result: userCart });
        } catch (error) {
            next(error);
        }
    }

    addNewProductToCartController = async (req, res, next) => {
        try {
            //Recuperando el id y la cantidad de producto
            if (!req.body.productId || !req.body.quantity) throw new CustomError(
                STATUS.BAD_REQUEST,
                "Product ID or quantity is not defined"
            );
            const productId = req.body.productId;
            const quantity = Number.parseFloat(req.body.quantity);

            const productDetails = await this.productsApi.getByIdApi(productId);
            if (!productDetails) throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.PRODUCT_NOT_FOUND
            );
            const userId = await req.user._id;
            const item = {
                ...productDetails,
                productId,
                quantity,
                total: parseFloat(productDetails.price * quantity),
            }
            const result = await this.cartApi.addProductToCartApi(userId, item);
            res.json({ success: true, result });
        } catch (error) {
            next(error)
        }
    }
    substractProductToCartController = async (req, res, next) => {
        try {
            //Recuperando el id y la cantidad de productos
            if (!req.body.productId || !req.body.quantity) throw new CustomError(
                STATUS.BAD_REQUEST,
                "Product ID or quantity is not defined"
            );
            const productId = req.body.productId;
            const quantity = Number.parseFloat(req.body.quantity);

            const productDetails = await this.productsApi.getByIdApi(productId);
            if (!productDetails) throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.PRODUCT_NOT_FOUND
            );
            const userId = await req.user._id;
            const item = {
                productId,
                quantity
            }
            const result = await this.cartApi.subtractProductToCartApi(userId, item);
            res.json({ success: true, result });
        } catch (error) {
            next(error)
        }
    }
    delProductFromCartController = async (req, res, next) => {
        try {
            if (!req.params.productId) {
                throw new CustomError(
                    STATUS.BAD_REQUEST,
                    "Product ID or quantity is not defined"
                );
            }
            const productId = req.params.productId;
            const userId = await req.user._id;

            const result = await this.cartApi.delProductFromCartApi(userId, productId)
            return res.json({ success: true, result });

        } catch (error) {
            next(error)
        }
    }

    clearCart = async (req, res, next) => {
        try {
            const userId = await req.user._id;
            const userCart = await this.cartApi.getUserCartApi(userId);
            if (userCart) {
                userCart.items = [];
                userCart.subTotal = 0;
                const result = await this.cartApi.updateByIdApi(userCart._id, userCart);
                return res.json({ success: true, result });
            } else {
                return res.json({ success: true, result: "Nothing to clear" });
            }
        } catch (error) {
            next(error)
        }
    }
}
export default CartsController;
