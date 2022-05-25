import mongoose from 'mongoose';
import MongoContainer from '../../containers/MongoContainer.js';

const collection = 'carts';

const cartsSchema = new mongoose.Schema({
    timestamp: { type: Date, min: Date.now() },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
});

class CarritosDaoMongoDb extends MongoContainer {
    constructor() {
        super(collection, cartsSchema);
    }
    populateCart = async (id) => {
        const result = await this.model.findOne({ _id: id }).populate('products');
        return result;
    }
}

export default CarritosDaoMongoDb;