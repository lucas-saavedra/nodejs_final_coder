import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';
import ItemSchema from "./item.schema.js";
const AutoIncrement = AutoIncrementFactory(mongoose);


let OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    email: {
        type: mongoose.Schema.Types.String,
        ref: "users",
    },
    adress: {
        type: mongoose.Schema.Types.String,
        ref: "users",
    },
    phone: {
        type: mongoose.Schema.Types.String,
        ref: "users",
    },
    name: {
        type: mongoose.Schema.Types.String,
        ref: "users",
    },
    items: [ItemSchema],

    subTotal: {
        default: 0,
        type: Number
    },
    state: { default: 'generated', type: String }
}, { timestamps: true });
OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });
export default OrderSchema