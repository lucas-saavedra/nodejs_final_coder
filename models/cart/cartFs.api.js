
const fs = require('fs/promises');
const ProductsApiFs = require('../product/productsFs.api')
const productsApiFs = new ProductsApiFs();
class CartApiFs {
    constructor() {
        this.fileName = './public/carritos.txt';
    }
    async createFileIfNotExists() {
        let notExists = false;
        try {
            return await fs.readFile(this.fileName, 'utf-8');
        } catch (error) {
            if (error.code === 'ENOENT') {
                notExists = true;
            } else {
                return error.message;
            }
        }
        if (notExists) {
            try {
                await fs.writeFile(this.fileName, '[]');
                const file = await fs.readFile(this.fileName, 'utf-8');
                return file;
            } catch (error) {
                return error.message;
            }
        }
    }
    async getAllCarts() {
        try {
            let cartList = await this.createFileIfNotExists();
            return JSON.parse(cartList);
        } catch (error) {
            return { error: error.message };
        }
    }
    async newCart() {
        try {
            let newCart = {};
            let cartList = await this.createFileIfNotExists();
            cartList = JSON.parse(cartList);
            if (!cartList.length) {
                newCart.id = 1;
            } else {
                newCart.id = cartList.at(-1).id + 1;
            }
            newCart = { ...newCart, productos: [], timestamp: Date.now() };
            cartList.push(newCart);
            await fs.writeFile(this.fileName, JSON.stringify(cartList));
            return newCart;
        } catch (error) {
            return { error: error.message };
        }

    }
    async getCartById(id) {
        try {
            let cartList = await this.createFileIfNotExists();
            cartList = JSON.parse(cartList);
            const findCart = cartList.find(e => e.id === id);
            return findCart ? findCart.productos : { error: `El id: ${id} no existe ` };
        } catch (error) {
            return { error: error.message };
        }
    }
    async addNewProductToCart(cart_id, prod_id) {
        try {
            let cartList = await this.createFileIfNotExists();
            cartList = JSON.parse(cartList);
            const cartIndex = cartList.findIndex(cart => cart.id === cart_id);
            if (cartIndex === -1) {
                return { error: `Error: el carrito con el id: ${cart_id} no existe` };
            } else {
                const result = await productsApiFs.getProductById(prod_id);
                if (result.error) {
                    throw new Error(result.error);
                } else {
                    cartList[cartIndex].productos.push({ ...result });
                    await fs.writeFile(this.fileName, JSON.stringify(cartList));
                    return cartList[cartIndex].productos;
                }
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteCartById(id) {
        try {
            let cartList = await this.createFileIfNotExists();
            cartList = JSON.parse(cartList);
            const index = cartList.findIndex(
                (cart) => cart.id === id
            );
            if (index === -1) {
                return { error: `Error: el id: ${id} no existe` };
            } else {
                cartList = cartList.filter((cart) => cart.id !== id);
                await fs.writeFile(this.fileName, JSON.stringify(cartList));
                return `El carrito con el id: ${id} fue eliminado correctamente`
            }
        } catch (error) {
            return { error: error.message }
        }
    }

    async deleteProductFromCartByIds(productId, cartId) {
        try {
            let cartList = await this.createFileIfNotExists();
            cartList = JSON.parse(cartList);
            const cartIndex = cartList.findIndex(
                (cart) => cart.id === cartId
            );
            if (cartIndex === -1) {
                return { error: `Error: el carrito con id: ${cartId} no existe` };
            } else {
                let { productos } = cartList[cartIndex];
                const productIndex = productos.findIndex(product => product.id === productId);
                if (productIndex === -1) {
                    return { error: `Error: El producto con id: ${productId} no se encuentra en el carrito` };
                } else {
                    productos = productos.filter((product) => product.id !== productId);
                    cartList[cartIndex] = { ...cartList[cartIndex], productos };
                    await fs.writeFile(this.fileName, JSON.stringify(cartList));
                    return `El producto con el id: ${productId} fue eliminado correctamente`
                }
            }
        } catch (error) {
            return { error: error.message }
        }
    }
};

module.exports = CartApiFs;