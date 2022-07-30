import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            "Invalid email",
        ],
    },
    name: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'user'
    },

    body: {
        type: String,
        required: true
    },
}, { timestamps: true })

export default MessageSchema;