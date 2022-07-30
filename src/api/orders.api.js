import getOrdersDao from "../models/daos/orders/Orders.dao.factory.js";

class OrdersApi {
    constructor() {
        this.ordersDao = getOrdersDao();
    }

    addApi = async (order) => {
        const result = await this.ordersDao.add(order);
        return result;
    }
}
export default OrdersApi