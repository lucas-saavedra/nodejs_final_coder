import getUsersDao from "../models/daos/users/Users.dao.factory.js";


class UsersRepo {
    constructor() {
        this.usersDao = getUsersDao();
    }
    async createUserRepo(payload) {
        const userCreated = await this.usersDao.createUser(payload);
        return userCreated;
    }
    async getUserByUsernameRepo(payload) {
        const user = await this.usersDao.getByUsername(payload);
        return user;
    }
    async getAllRepo() {
        const users = await this.usersDao.getAll();
        return users;
    }
    async getByIdRepo(id) {
        const user = await this.usersDao.getById(id);
        return user;
    }
    async insertRepo(payload) {
        const newUser = await this.usersDao.add(payload);
        return newUser;
    }
    async updateByIdRepo(id, updatedPayload) {
        const updatedUser = await this.usersDao.updateById(id, updatedPayload);
        return updatedUser;
    }
    async deleteByIdRepo(id) {
        const deletedUser = await this.usersDao.deleteById(id);
        return deletedUser;
    }
    async deleteManyRepo(filter) {
        const deletedUsers = await this.usersDao.deleteMany(filter);
        return deletedUsers;
    }

}
export default UsersRepo;