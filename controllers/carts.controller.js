const { CartApi } = require('../models')
const cartApiFs = new CartApi();

const newCartController = async (req, res) => {
    result = await cartApiFs.newCart();
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const getCartByIdController = async (req, res) => {
    const cartId = +req.params.id;
    if (isNaN(cartId)) { return res.status(400).json({ error: 'El id del carrito debe ser un numero' }); }
    result = await cartApiFs.getCartById(cartId);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });
}
const addNewProductToCartController = async (req, res) => {
    const prod_id = +req.body.id_prod;
    const cart_id = +req.params.id;
    if (isNaN(prod_id)) { return res.status(400).json({ error: 'El id del producto debe ser un numero' }); }
    if (isNaN(cart_id)) { return res.status(400).json({ error: 'El id del carrito debe ser un numero' }); }
    result = await cartApiFs.addNewProductToCart(cart_id, prod_id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const deleteCartByIdController = async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
    result = await cartApiFs.deleteCartById(id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });
}

const delProductFromCartByIdsController = async (req, res) => {
    const id = +req.params.id;
    const idProd = +req.params.id_prod;
    if (isNaN(id)) { return res.status(400).json({ error: 'Cart Id debe ser un numero' }); }
    if (isNaN(idProd)) { return res.status(400).json({ error: 'Product Id debe ser un numero' }); }
    result = await cartApiFs.deleteProductFromCartByIds(idProd, id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });
}

module.exports = {
    newCartController,
    getCartByIdController,
    addNewProductToCartController,
    deleteCartByIdController,
    delProductFromCartByIdsController
}
