import daos from '../../models/daos/index.js'

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
export {
    getProductsController,
    addProductController,
    updProductController,
    deleteProductController
}