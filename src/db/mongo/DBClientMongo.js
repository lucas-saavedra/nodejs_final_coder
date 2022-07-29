import mongoose from "mongoose";
import envConfig from "../../../env.config.js";
import CustomError from "../../utils/customError.utils.js";
import getMongoDbUri from "./getMongoDbUri.js";
import DbClient from "../DBClient.js"
import { infoLog } from "../../utils/loggers.utils.js";

class MongoClient extends DbClient {
    constructor() {
        super();
        this.client = mongoose;
    }
    async connect() {
        try {
            const instance = await this.client.connect(getMongoDbUri(envConfig.DATABASE));
            return instance;
        } catch (error) {
            throw new CustomError(500, 'Error al conectarse de mongodb', error)
        }
    }
    async disconnect() {
        try {
            await this.client.connection.close();
        } catch (error) {
            throw new CustomError(500, 'Error al desconectarse de mongodb', error)
        }
    }
}

export default MongoClient;