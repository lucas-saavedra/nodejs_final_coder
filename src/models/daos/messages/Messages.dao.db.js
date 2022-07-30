

import MongoDaoDb from "../mongodb/Mongo.dao.js";

class MessagesDao extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }

}
export default MessagesDao;