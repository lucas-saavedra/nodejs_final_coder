import CartsRepo from "../repositories/cart.repo.js";

class CartsApi {
    constructor() {
        this.cartsRepo = new CartsRepo();
    }
    async getUserCartPopulatedApi(userId) {
        const cart = this.cartsRepo.getUserCartPopulateRepo(userId);
        return cart;
    }
    async initUserCartApi(userId) {
        const cart = await this.cartsRepo.initUserCartRepo(userId);
        return cart;
    }
    async addProductToCartApi(userId, item) {
        const cart = await this.cartsRepo.addProductToCartRepo(userId, item);
        return cart;
    }
    async subtractProductToCartApi(userId, item) {
        const cart = await this.cartsRepo.subtractProductToCartRepo(userId, item);
        return cart;
    }
    async delProductFromCartApi(userId, productId) {
        const cart = await this.cartsRepo.delProductFromCartRepo(userId, productId);
        return cart;
    }
    async getUserCartApi(userId) {
        const cart = await this.cartsRepo.getUserCartRepo(userId);
        return cart;
    }
    async clearCartApi(userId) {
        const cart = await this.cartsRepo.clearCartRepo(userId);
        return cart;
    }
    async getAllApi(filter = {}) {
        const carts = await this.cartsRepo.getAllRepo(filter);
        return carts;
    }
    async getByIdApi(id) {
        const cart = this.cartsRepo.getByIdRepo(id);
        return cart;
    }
    async addApi(element) {
        const cart = this.cartsRepo.addRepo(element);
        return cart;
    }
    async updateByIdApi(id, element) {
        const updatedcart = await this.cartsRepo.updateByIdRepo(id, element);
        return updatedcart;
    }
    async deleteByIdApi(id) {
        const deleted = this.cartsRepo.deleteByIdRepo(id);
        return deleted;
    }
}

export default CartsApi