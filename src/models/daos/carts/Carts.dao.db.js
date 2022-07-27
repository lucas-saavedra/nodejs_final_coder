import CartSchema from "../../schemas/cart.schemas.js";
import MongoDaoDb from "../mongodb/Mongo.dao.js";

class CartsDaoMongoDb extends MongoDaoDb {
    constructor(collection, cartsSchema) {
        super(collection, cartsSchema);
    }
    getUserCart = async (userId) => {
        const userCart = await this.model.findOne({ userId });
        return userCart
    }
    getUserCartPopulated = async (userId) => {
        const pupulated = await this.model.findOne({ userId }).populate({
            path: "items.productId",
            select: "name price total details url quantity"
        });

        return pupulated;
    };
}
export default CartsDaoMongoDb;