
import daos from '../../models/daos/index.js'
import { sendBuyConfirmationEmail } from '../../services/nodemailer.js';
import { sendSmsBuyConfirmation, sendWspBuyConfirmation } from '../../services/twilio.js';
const carritosDao = new daos.CarritosDaoMongoDb();
const newCartController = async (req, res, next) => {
    try {
        const result = await carritosDao.insert({ timestamp: Date.now(), products: [] });
        res.json({ success: true, result });
    } catch (error) {
        next(error);
    }
}
const getCartByIdController = async (req, res, next) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const result = await carritosDao.getById(id);
            res.json({ success: true, result });
        } else {
            throw new Error('Id not defined');
        }
    } catch (error) {
        next(error);
    }
}
const addNewProductToCartController = async (req, res, next) => {
    try {
        if (req.params.id) {
            const cartId = req.params.id;
            const cartResult = await carritosDao.getById(cartId);
            if (req.body.id) {
                if (!cartResult.hasOwnProperty('products')) {
                    throw new Error('[NOT_FOUND] => The cart does not exist!')
                }
                cartResult.products.push(req.body.id);
                const result = await carritosDao.updateById(cartId, cartResult);
                res.json({ success: true, result })
            } else {
                throw new Error('The ID of the product to insert is not defined')
            }
        } else {
            throw new Error('The ID of the cart is not defined')
        }
    } catch (error) {
        next(error)
    }
}
const deleteCartByIdController = async (req, res, next) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            await carritosDao.deleteById(id);
            return res.json({ success: true, result: 'Document successefully deleted' });
        } else {
            throw new Error('Id not defined')
        }
    } catch (error) {
        next(error)
    }

}

const delProductFromCartByIdsController = async (req, res, next) => {
    try {
        if (req.params.id && req.params.id_prod) {
            const cartId = req.params.id;
            const productId = req.params.id_prod;
            const cartResult = await carritosDao.getById(cartId);
            let products = cartResult.products.filter((_id) => _id != productId);
            cartResult.products = [...products];
            const result = await carritosDao.updateById(cartId, cartResult);
            res.json({ success: true, result: result })
        } else {
            throw new Error('You must fill all the fields')
        }
    } catch (error) {
        next(error)
    }
}


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

export {
    newCartController,
    getCartByIdController,
    checkoutCartController,
    addNewProductToCartController,
    deleteCartByIdController,
    delProductFromCartByIdsController
}
