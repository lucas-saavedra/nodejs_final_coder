import CartsApi from "../api/carts.api.js";
import OrdersApi from "../api/orders.api.js";
import { sendOrderConfirmationEmail } from "../services/nodemailer.js";
import CustomError from "../utils/errors/CustomError.js";


class OrdersController {
    constructor() {
        this.ordersApi = new OrdersApi();
        this.cartsApi = new CartsApi();
    }
    checkoutOrderController = async (req, res, next) => {
        try {
            const userId = req.user._id;
            const cart = await this.cartsApi.getUserCartApi(userId);
            const error = new CustomError(404, "Cart must have some product");
            if (cart.items.length === 0) throw error;
            const newOrder = {
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                adress: req.user.adress,
                userId: req.user._id,
                items: cart.items,
                subTotal: cart.subTotal
            }
            const result = await this.ordersApi.addApi(newOrder);
            await sendOrderConfirmationEmail(result)
            return res.json({ success: true, result });
        } catch (error) {
            next(error)
        }
    }
}
export default OrdersController;