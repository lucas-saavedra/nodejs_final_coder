const fs = require('fs/promises');

class ProductsApiFs {
    constructor() {
        this.fileName = `./public/productos.txt`;
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
    async getAllProducts() {
        try {
            const productList = await this.createFileIfNotExists();
            return JSON.parse(productList);
        } catch (error) {
            return { error: error.message };
        }
    }
    async getProductById(id) {
        try {
            let productList = await this.createFileIfNotExists();
            productList = JSON.parse(productList);
            const findProduct = productList.find(e => e.id === id);
            return findProduct ? findProduct : { error: `El id: ${id} no existe ` };
        } catch (error) {
            return { error: error.message };
        }
    }

    async addProduct(product) {
        try {
            let productList = await this.createFileIfNotExists();
            productList = JSON.parse(productList);
            if (!productList.length) {
                product.id = 1;
            } else {
                product.id = productList.at(-1).id + 1;
            }
            const newProduct = { ...product, timestamp: Date.now() };
            productList.push(newProduct);
            await fs.writeFile(this.fileName, JSON.stringify(productList));
            return newProduct;
        } catch (error) {
            return { error: error.message };
        }
    }
    async updateProduct(producToUpdate) {
        try {
            let productList = await this.createFileIfNotExists();
            productList = JSON.parse(productList);
            const index = productList.findIndex(
                (product) => product.id === producToUpdate.id
            );
            if (index === -1) {
                return { error: `Error: el id: ${producToUpdate.id} no existe` };
            } else {
                const productUpdated = {
                    ...productList[index],
                    ...producToUpdate
                }
                productList[index] = productUpdated;
                await fs.writeFile(this.fileName, JSON.stringify(productList));
                return productUpdated;
            }
        } catch (error) {
            return { error: error.message }
        }
    }

    async deleteProdById(id) {
        try {
            let productList = await this.createFileIfNotExists();
            productList = JSON.parse(productList);
            const index = productList.findIndex(
                (product) => product.id === id
            );
            if (index === -1) {
                return { error: `Error: el id: ${id} no existe`, status: 404 };
            } else {
                productList = productList.filter((product) => product.id !== id);
                await fs.writeFile(this.fileName, JSON.stringify(productList));
                return `El producto con el id: ${id} fue eliminado correctamente`
            }
        } catch (error) {
            return { error: error.message }
        }
    }
};

module.exports = ProductsApiFs;