import daos from '../../models/daos/index.js'
import { faker } from '@faker-js/faker';
const productsDao = new daos.ProductosDaoMongoDb();
const getProductsController = async (req, res, next) => {
    try {
        let result;
        if (req.params.id) {
            const id = req.params.id;
            result = await productsDao.getById(id);
            res.json({ success: true, result })
        } else {
            result = await productsDao.getAll();
            res.json({ success: true, result })
        }
    } catch (error) {
        next(error);
    }
}
const addProductController = async (req, res, next) => {
    try {
        const result = await productsDao.insert({ ...req.body });
        res.json({ success: true, result })
    } catch (error) {
        next(error)
    }
}
const updProductController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await productsDao.updateById(id, { ...req.body });
        return res.json({ success: true, result });
    } catch (error) {
        next(error);
    }

}
const deleteProductController = async (req, res, next) => {
    try {
        const id = req.params.id;
        await productsDao.deleteById(id);
        return res.json({ success: true, result: 'Document successefully deleted' });
    } catch (error) {
        next(error);
    }
}
const generateProducts = async (req, res, next) => {
    //genera una lista de 5 productos falsos
    try {
        for (let index = 0; index < 5; index++) {
            let mockUpProduct = {
                titulo: faker.commerce.product(),
                descripcion: faker.commerce.productDescription(),
                foto: faker.image.food(),
                codigo: faker.random.alphaNumeric(5),
                precio: faker.commerce.price(),
                stock: faker.random.numeric(),
            }
            await productsDao.insert({ ...mockUpProduct });
        }
        return res.json({ success: true, result: 'Generated' });
    } catch (error) {
        next(error);
    }

}
export {
    generateProducts,
    getProductsController,
    addProductController,
    updProductController,
    deleteProductController
}