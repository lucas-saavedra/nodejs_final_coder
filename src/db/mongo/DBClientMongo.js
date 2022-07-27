import mongoose from "mongoose";
import envConfig from "../../../env.config.js";
import CustomError from "../../utils/errors/CustomError.js";
import getMongoDbUri from "./getMongoDbUri.js";
import DbClient from "../DBClient.js"

let instance = null;
class MongoClient extends DbClient {
    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
    }
    async connect() {
        try {
            instance = await this.client.connect(getMongoDbUri(envConfig.DATABASE));
            this.connected = true;
            return instance;
        } catch (error) {
            console.log(error);
        }
    }
    async disconnect() {
        try {
            await this.client.connection.close()
            console.log('base de datos desconectada')
            this.connected = false
        } catch (error) {
            throw new CustomError(500, 'error al desconectarse de mongodb', error)
        }
    }
}

export default MongoClient;