import config from "../../../../env.config.js";
import MessagesDao from './Messages.dao.db.js'
import MessageSchema from "../../schemas/message.schema.js";
let dao;
const persistence = config.PERSISTENCE.messages_persistence || 'mongo';
switch (persistence) {
    case 'mem':
        //
        break;
    case 'mongo':
        dao = new MessagesDao('messages', MessageSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following (MEM | MONGO)')
}

const getMessagesDao = () => {
    return dao
}
export default getMessagesDao;