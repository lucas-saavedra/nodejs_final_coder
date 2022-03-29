import MongoContainer from "../../containers/MongoContainer.js";
import mongoose from "mongoose";

const collection = 'products'
const productsSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    foto: { type: String },
    codigo: { type: String, unique: true, required: true },
    precio: { type: Number, min: 0, required: true },
    stock: { type: Number, min: 0, required: true },
    timestamp: { type: Date, min: Date.now() }

})
class ProductosDaoMongoDb extends MongoContainer {
    constructor() {
        super(collection, productsSchema);
    }
}
export default ProductosDaoMongoDb;