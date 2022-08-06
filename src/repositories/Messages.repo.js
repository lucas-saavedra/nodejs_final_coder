import getMessagesDao from "../models/daos/messages/Messages.dao.factory.js";
import moment from "moment";
class MessagesRepo {
    constructor() {
        this.msgDaos = getMessagesDao();
        this.moment = moment;
        this.moment.locale('es');
    }
    msgsDateParser = (msgs) => {
        const msgsWithParsedDate = msgs.map((msg) => ({ ...msg, createdAt: this.moment(msg.createdAt).format('LLLL') }));
        return msgsWithParsedDate;
    }
    addRepo = async (payload) => {
        const result = await this.msgDaos.add(payload);
        return result;
    }
    getAllRepo = async () => {
        const msgs = await this.msgDaos.getAll();
        return this.msgsDateParser(msgs);

    }
    getAllMsgsFromEmailRepo = async (email) => {
        const msgs = await this.msgDaos.getAll(email);
        return this.msgsDateParser(msgs);
    }
}
export default MessagesRepo;
