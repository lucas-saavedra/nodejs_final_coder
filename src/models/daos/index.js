
import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js"
import CarritosDaoMongoDb from './carritos/CarritosDaoMongoDb.js'
import UserDaoMongoDb from "./usuarios/UsuariosDaoMongoDb.js"


const daos = {
    UserDaoMongoDb,
    ProductosDaoMongoDb,
    CarritosDaoMongoDb
}
export default daos;