/* 
import { sendBuyConfirmationEmail } from '../../services/nodemailer.js';
import { sendSmsBuyConfirmation, sendWspBuyConfirmation } from '../../services/twilio.js'; */
import CartsApi from '../api/carts.api.js';
import ProductsApi from '../api/products.api.js';

import { MESSAGES, STATUS } from '../utils/constants/api.constants.js';
import CustomError from '../utils/errors/CustomError.js';

class CartsController {
    constructor() {
        this.cartApi = new CartsApi();
        this.productsApi = new ProductsApi();
    }
    getCarForSession = async (req, res, next) => {
        try {

            const userId = await req.user._id;
            const cart = await this.cartApi.getUserCartApi(userId);
            if (!cart) {
                const newCart = {
                    items: [],
                    userId: req.user._id
                }
                req.session.cart = await this.cartApi.addApi(newCart);
            } else {
                req.session.cart = cart;
            }
            req.session.save(function (err) {
                if (err) next(err);
            })
            return res.json({ success: true, result: req.session.cart });
        } catch (error) {
            next(error);
        }
    }

    addNewProductToCartController = async (req, res, next) => {
        try {
            //Recuperando el id de producto
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
            const result = await this.cartApi.getUserCartApi(userId)

            if (!result) {
                const userCart = {
                    userId,
                    items: [{
                        ...productDetails,
                        productId,
                        quantity,
                        total: parseFloat(productDetails.price * quantity),
                    }],
                    subTotal: parseFloat(productDetails.price * quantity),
                }
                const newUserCart = await this.cartApi.addApi(userCart);
                return res.json({ success: true, result: newUserCart });

            } else {
                const cart = await this.cartApi.getUserCartPopulatedApi(userId);
                //---- check if index exists ----
                const indexFound = cart.items.findIndex(item => item.productId.id == productId);
                //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
                if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if Quantity is Greater than 0 then add item to items Array ----
                else if (quantity > 0) {
                    cart.items.push({
                        ...productDetails,
                        productId: productId,
                        quantity,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----if quantity of price is 0 throw the error -------
                else {
                    throw new CustomError(
                        STATUS.BAD_REQUEST,
                        MESSAGES.BAD_REQUEST
                    );
                };

                req.session.cart = await this.cartApi.updateByIdApi(cart.id, cart);
                req.session.save(function (err) {
                    if (err) next(err);
                    res.json({ success: true, result: req.session.cart });
                })
            }
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
            const result = await this.cartApi.getAllApi({ userId })
            const cart = result[0];

            const indexFound = cart.items.findIndex(item => item.productId == productId);
            if (indexFound !== -1) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
 
                const cartId = cart._id;
                req.session.cart = await this.cartApi.updateByIdApi(cartId, cart);
                req.session.save(function (err) {
                    if (err) next(err);
                    res.json({ success: true, result: req.session.cart });
                })
            } else {
                throw new CustomError(
                    STATUS.BAD_REQUEST,
                    "Product does not exists"
                );
            }

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


/*







const checkoutCartController = async (req, res, next) => {
    try {
        if (req.params.id) {
            // id del carrito 
            const id = req.params.id;
            //populo el carrito con los productos referenciados de la base de dato de mongo
            const result = await carritosDao.populateCart(id);
            const products = result.products;
            products.total = products.map((item) => +item.precio).reduce(((acc, value) => { return acc + value }), 0);
            sendSmsBuyConfirmation(req, id, products.total)
            sendWspBuyConfirmation(req)
            await sendBuyConfirmationEmail(products, req);
            res.send({ result: 'OK' })
        } else {
            throw new Error('Id not defined')
        }
    } catch (error) {
        next(error);
    }
}
*/