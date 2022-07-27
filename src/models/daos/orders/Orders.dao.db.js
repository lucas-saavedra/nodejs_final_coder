

import MongoDaoDb from "../mongodb/Mongo.dao.js";

class OrdersDaoDb extends MongoDaoDb {
    constructor(collection, schema) {
        super(collection, schema);
    }

}
export default OrdersDaoDb;