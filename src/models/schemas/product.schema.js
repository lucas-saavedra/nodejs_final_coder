import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String },
    url: { type: String },
    code: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    stock: { type: Number, min: 0, required: true },

}, { timestamps: true })
export default ProductsSchema;

