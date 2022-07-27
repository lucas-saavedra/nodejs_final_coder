import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true
})
export default ItemSchema;