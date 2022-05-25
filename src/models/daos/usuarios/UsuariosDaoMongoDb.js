
import mongoose from "mongoose";
import MongoContainer from "../../containers/MongoContainer.js";

const collection = 'users'
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
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    avatar_path: { type: String, required: true },
    timestamp: { type: Date, min: Date.now() }

})
class UserDaoMongoDb extends MongoContainer {
    constructor() {
        super(collection, usersSchema);
    }
    async createUser(newUser) {
        try {
            const user = await this.insert(newUser);
            return user;
        }
        catch (error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new Error('User already registered');
            }
            throw new Error(error);
        }

    };
    async getByEmail(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 }).lean();
            return document;
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default UserDaoMongoDb;