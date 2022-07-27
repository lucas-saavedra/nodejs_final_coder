import config from "../../../../env.config.js";
import ProductsSchema from "../../schemas/product.schema.js";
import ProductsDaoDb from "./ProductsDaoDb.js";
import ProductsDaoMem from "./ProductsDaoMem.js";

let dao;
switch (config.products_persistence) {
    case 'mem':
        dao = new ProductsDaoMem();
        break;
    case 'mongo':
        dao = new ProductsDaoDb('product', ProductsSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MEM | MONGO)')
}

const getProductsDao = () => {
    return dao
}
export default getProductsDao;