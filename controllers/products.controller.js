const { ProductsApi } = require('../models')
const productsApiFs = new ProductsApi()

const getProductsController = async (req, res) => {
    let result = [];
    if (req.params.id) {
        const id = +req.params.id;
        if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
        result = await productsApiFs.getProductById(id);
    } else {
        result = await productsApiFs.getAllProducts();
    }
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const addProductController = async (req, res) => {
    const product = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    } = req.body;
    const emptyValues = !nombre || !descripcion || !codigo || !foto || !precio || !stock;
    if (emptyValues) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    }
    if (isNaN(precio)) {
        return res.status(400).json({ error: 'Precio debe ser un numero' });
    } else {
        result = await productsApiFs.addProduct({ ...product, precio: +precio });
        return !result.error ?
            res.json({ success: true, result }) :
            res.json({ success: false, result: result.error });
    }
}
const updProductController = async (req, res) => {
    let product = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    } = req.body;
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
    if (product.hasOwnProperty('precio')) {
        if (isNaN(precio)) { return res.status(400).json({ error: 'Precio debe ser un numero' }); }
        else {
            product.precio = +precio;
        }
    }
    if (product.hasOwnProperty('stock')) {
        if (isNaN(stock)) { return res.status(400).json({ error: 'Stock debe ser un numero' }); }
        else {
            product.stock = +stock;
        }
    }
    result = await productsApiFs.updateProduct({ ...product, id });
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const deleteProductController = async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); };
    result = await productsApiFs.deleteProdById(id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
module.exports = {
    getProductsController,
    addProductController,
    updProductController,
    deleteProductController
}