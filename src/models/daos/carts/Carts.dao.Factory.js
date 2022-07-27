import config from "../../../../env.config.js";
import cartsSchema from "../../schemas/cart.schemas.js";
import CartsDaoMongoDb from "./Carts.dao.db.js";

let dao;
switch (config.orders_persistence) {
    case 'mem':
        // -> Falta implementar
        break;
    case 'mongo':
        dao = new CartsDaoMongoDb('cart', cartsSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MEM | MONGO)')
}

const getCartsDao = () => {
    return dao
}
export default getCartsDao;