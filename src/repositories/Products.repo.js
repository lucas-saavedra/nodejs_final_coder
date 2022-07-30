
import getProductsDao from "../models/daos/products/Products.dao.factory.js";


class ProductsRepo {
    constructor() {
        this.productsDao = getProductsDao();
    }
    async getAllRepo(filter = {}) {
        const products = await this.productsDao.getAll(filter);
        return products;
    }
    async getByIdRepo(id) {
        const product = await this.productsDao.getById(id);
        return product;
    }
    async insertRepo(element) {
        const newProduct = await this.productsDao.add(element);
        return newProduct;
    }
    
    async updateByIdRepo(id, updatedElement) {
        const updatedProduct = await this.productsDao.updateById(id, updatedElement);
        return updatedProduct;
    }
    async deleteByIdRepo(id) {
        const deletedProducts = await this.productsDao.deleteById(id);
        return deletedProducts;
    }
    async deleteManyRepo(filter) {
        const deletedProducts = await this.productsDao.deleteMany(filter);
        return deletedProducts;
    }

}
export default ProductsRepo;