import getCartsDao from "../models/daos/carts/Carts.dao.Factory.js";
import { STATUS, MESSAGES } from "../utils/constants.utils.js";
import CustomError from "../utils/customError.utils.js";

class CartsRepo {
    constructor() {
        this.cartsDao = getCartsDao();
    }
    async getUserCartPopulateRepo(userId) {
        const cart = this.cartsDao.getUserCartPopulated(userId);
        return cart;
    }
    async initUserCartRepo(userId) {
        let userCart = await this.cartsDao.getUserCart(userId);
        if (!userCart) {
            const newUserCart = {
                items: [],
                userId
            }
            return await this.cartsDao.add(newUserCart);
        }
        return userCart;
    }
    async addProductToCartRepo(userId, item) {
        let userCart = await this.cartsDao.getUserCart(userId);
        if (!userCart) {
            const newUserCart = {
                items: [
                    { item }
                ],
                userId,
                subTotal: parseFloat(item.price * item.quantity)
            }
            const result = await this.cartsDao.add(newUserCart);
            return result;
        }
        const cart = await this.getUserCartPopulateRepo(userId);

        const indexFound = cart.items.findIndex(element => element._id == item.productId);
        //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
        if (indexFound !== -1) {
            cart.items[indexFound].quantity = cart.items[indexFound].quantity + item.quantity;
            cart.items[indexFound].total = cart.items[indexFound].quantity * cart.items[indexFound].price;
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
        //----Check if Quantity is Greater than 0 then add item to items Array ----
        else if (item.quantity > 0) {
            cart.items.push({ ...item });
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
        //----if quantity of price is 0 throw the error -------
        else {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.PRODUCT_NOT_FOUND
            );
        };
        const updatedCart = await this.cartsDao.updateById(cart._id, cart)
        return updatedCart;
    }
    async subtractProductToCartRepo(userId, item) {
        const cart = await this.getUserCartRepo(userId);
        if (!cart) {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.CART_NOT_FOUND
            );
        }
        const indexFound = cart.items.findIndex(element => element._id == item.productId);
        //----------check if product exist-------//

        if (indexFound !== -1) {
            if (cart.items[indexFound].quantity - item.quantity <= 0) {
                cart.items.splice(indexFound, 1);
                cart.items.length === 0 ?
                    cart.subTotal = 0 :
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            } else {
                console.log(cart.items[indexFound]);
                cart.items[indexFound].quantity = cart.items[indexFound].quantity - item.quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * cart.items[indexFound].price;
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
        }
        else {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.PRODUCT_NOT_FOUND
            );
        };
        const updatedCart = await this.cartsDao.updateById(cart._id, cart)
        return updatedCart;
    }
    async delProductFromCartRepo(userId, productId) {
        const cart = await this.getUserCartPopulateRepo(userId);
        if (!cart) {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.CART_NOT_FOUND
            );
        }
        const indexFound = cart.items.findIndex(element => element.productId.id == productId);
        //----------check if product exist---////
        if (indexFound !== -1) {
            cart.items.splice(indexFound, 1);
            cart.items.length === 0 ?
                cart.subTotal = 0 :
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        } else {
            throw new CustomError(
                STATUS.BAD_REQUEST,
                MESSAGES.PRODUCT_NOT_FOUND
            );
        }
        const updatedCart = await this.cartsDao.updateById(cart._id, cart)
        return updatedCart;

    }
    async getUserCartRepo(userId) {
        const cart = await this.cartsDao.getUserCart(userId);
        return cart;
    }
    async clearCartRepo(userId) {
        const userCart = await this.cartsDao.getUserCart(userId);
        if (userCart) {
            userCart.items = [];
            userCart.subTotal = 0;
            const result = await this.cartsDao.updateById(userCart._id, userCart);
            return result;
        }
        return null;
    }
    async getAllRepo(filter = {}) {
        const carts = await this.cartsDao.getAll(filter);
        return carts;
    }
    async getByIdRepo(id) {
        const cart = this.cartsDao.getById(id);
        return cart;
    }
    async addRepo(element) {
        const cart = this.cartsDao.add(element);
        return cart;
    }
    async updateByIdRepo(id, element) {
        const updatedcart = await this.cartsDao.updateById(id, element);
        return updatedcart;
    }
    async deleteByIdRepo(id) {
        const deleted = this.cartsRepo.deleteById(id);
        return deleted;
    }
    async deleteManyRepo(filter) {
        const deleted = this.carts.deleteMany(filter);
        return deleted;
    }
}

export default CartsRepo