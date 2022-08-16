import MessagesRepo from "../repositories/Messages.repo.js";


class MessagesApi {
    constructor() {
        this.msgsRepo = new MessagesRepo();
    }
    addApi = async (payload) => {
        const result = await this.msgsRepo.addRepo(payload);
        return result;
    }
    getAllApi = async () => {
        const result = await this.msgsRepo.getAllRepo();
        return result;
    }
    getAllMsgsFromEmailApi = async (email) => {
        const result = await this.msgsRepo.getAllMsgsFromEmailRepo(email);
        return result;
    }
}
export default MessagesApi