import getMessagesDao from "../models/daos/messages/Messages.dao.factory.js";

class MessagesApi {
    constructor() {
        this.msgDaos = getMessagesDao();
    }
    addApi = async (payload) => {
        const result = await this.msgDaos.add(payload);
        return result;
    }
    getAllApi = async () => {
        const result = await this.msgDaos.getAll();
        return result;
    }
    getAllMsgsFromEmailApi = async (email) => {
        const result = await this.msgDaos.getAll(email);
        return result;
    }
}
export default MessagesApi