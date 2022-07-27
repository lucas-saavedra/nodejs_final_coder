import config from "../../../../env.config.js";
import OrderSchema from "../../schemas/order.schema.js";
import OrdersDaoDb from './Orders.dao.db.js'

let dao;
const persistence = config.orders_persistence || 'mongo'
switch (persistence) {
    case 'mem':
        //
        break;
    case 'mongo':
        dao = new OrdersDaoDb('order', OrderSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MEM | MONGO)')
}

const getOrdersDao = () => {
    return dao
}
export default getOrdersDao;