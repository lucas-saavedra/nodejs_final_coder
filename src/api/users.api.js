import UsersRepo from "../repositories/Users.repo.js";


class UsersApi {
    constructor() {
        this.usersRepo = new UsersRepo();
    }
    async createUserApi(element) {
        const userCreated = await this.usersRepo.createUserRepo(element);
        return userCreated;
    }
    async getUserByUsernameApi(username) {
        const user = await this.usersRepo.getUserByUsernameRepo(username);
        return user;
    }
    async getAllApi() {
        const users = await this.usersRepo.getAllRepo();
        return users;
    }
    async getByIdApi(id) {
        const user = this.usersRepo.getByIdRepo(id);
        return user;
    }
    async addApi(element) {
        const user = this.usersRepo.insertRepo(element);
        return user;
    }
    async updateByIdApi(id, element) {
        const updatedUser = await this.usersRepo.updateByIdRepo(id, element);
        return updatedUser;
    }
    async deleteByIdApi(id) {
        const deleted = this.usersRepo.deleteByIdRepo(id);
        return deleted;
    }
    async deleteManyApi(filter) {
        const deleted = this.usersRepo.deleteManyRepo(filter);
        return deleted;
    }
}
export default UsersApi;