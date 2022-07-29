import configs from "../../../../env.config.js";
import usersSchema from "../../schemas/users.schema.js";

import UsersDaoDb from "./Users.Dao.Db.js";

let dao;
switch (configs.PERSISTENCE.users_persistence) {
    case 'mongo':
        dao = new UsersDaoDb('users', usersSchema);
        break;
    default:
        throw new Error('Invalid data source, please provide one of the following ( MONGO)')
}

const getUsersDao = () => {
    return dao
}
export default getUsersDao;