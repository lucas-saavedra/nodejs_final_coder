import getCartsDao from "../models/daos/carts/Carts.dao.Factory.js";

class CartsApi {
    constructor() {
        this.cartsDao = getCartsDao();
    }
    async getUserCartPopulatedApi(userId) {
        const cart = this.cartsDao.getUserCartPopulated(userId);
        return cart;
    }
    async getUserCartApi(userId) {
        const cart = await this.cartsDao.getUserCart(userId);
        return cart;
    }
    async getAllApi(filter = {}) {
        const carts = await this.cartsDao.getAll(filter);
        return carts;
    }
    async getByIdApi(id) {
        const cart = this.cartsDao.getById(id);
        return cart;
    }
    async addApi(element) {
        const cart = this.cartsDao.add(element);
        return cart;
    }
    async updateByIdApi(id, element) {
        const updatedcart = await this.cartsDao.updateById(id, element);
        return updatedcart;
    }
    async deleteByIdApi(id) {
        const deleted = this.cartsRepo.deleteById(id);
        return deleted;
    }
    async deleteManyApi(filter) {
        const deleted = this.carts.deleteMany(filter);
        return deleted;
    }
}

export default CartsApi