import config from '../../config.js'
let ProductosDao;
let CarritosDao;

switch (config.ENV.PERS) {
    case 'firebase':
        const daoFirebaseProductos = await import("./productos/ProductosDaoFirebase.js");
        ProductosDao = daoFirebaseProductos.default;
        const daoFirebaseCarritos = await import('./carritos/CarritosDaoFirebase.js');
        CarritosDao = daoFirebaseCarritos.default;
        break;
    case 'mongo':
        const daoMongoProductos = await import("./productos/ProductosDaoMongoDb.js");
        ProductosDao = daoMongoProductos.default;
        const daoMongoCarritos = await import('./carritos/CarritosDaoMongoDb.js');
        CarritosDao = daoMongoCarritos.default;
        break;
    case 'mariadb':
        break;
    case 'sqlite':
        break;
    case 'file':
        break;
    case 'memory':
        break;
    default:
        throw new Error('Invalid persistent method');
}

export default {
    ProductosDao,
    CarritosDao
}