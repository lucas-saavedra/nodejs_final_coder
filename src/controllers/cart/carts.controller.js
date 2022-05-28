
import daos from '../../models/daos/index.js'

import ejs from 'ejs'
import client from '../../services/twilio.js';
import config from '../../../config.js';

const carritosDao = new daos.CarritosDaoMongoDb();
const adminEmail = 'lucassaavedra50@gmail.com';
const newCartController = async (req, res, next) => {
    try {
        const result = await carritosDao.insert({ timestamp: Date.now(), products: [] });
        res.json({ success: true, result })
    } catch (error) {
        next(error)
    }
}
const getCartByIdController = async (req, res, next) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const result = await carritosDao.getById(id);
            res.json({ success: true, result })
        } else {
            throw new Error('Id not defined')
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
    let message = {};
    try {
        if (req.params.id) {
            const id = req.params.id;
            const result = await carritosDao.populateCart(id)
            const products = result.products;
            client.messages
                .create({
                    body: 'Tu pedido con el ID :' + id + ' ha sido recibido y se encuentra en proceso',
                    messagingServiceSid: config.twilio_cfg.messagingServiceSid,
                    to: `${req.user.phone}`
                })
                .done();
            client.messages
                .create({
                    body: `Nuevo compra de ${req.user.name} => email ${req.user.email}`,
                    from: 'whatsapp:+14155238886',
                    to: 'whatsapp:+5493456620180'
                })
                .done();
            ejs.renderFile('src/views/productList.ejs', { products }, (err, str) => {
                message = {
                    from: "Servidor de node",
                    to: adminEmail,
                    subject: `Nuevo compra de ${req.user.name} => de ${req.user.email}`,
                    html: str
                }
            });
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
