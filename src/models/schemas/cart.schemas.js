import mongoose from "mongoose";
import ItemSchema from "./item.schema.js";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }

}, { timestamps: true });

CartSchema
    .set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject.__v

        }
    })

export default CartSchema

