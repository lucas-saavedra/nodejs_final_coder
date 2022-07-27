
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            "Invalid email",
        ],
    },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    adress: { type: String, },
    phone: { type: String, required: true },
    timestamp: {
        type: Date, min: Date.now()
    },
})
usersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})
export default usersSchema;