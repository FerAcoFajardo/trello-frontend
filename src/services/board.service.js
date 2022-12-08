import BoardStore from "../stores/board.stores.js";
import ServiceError from "../errors/errors.js"
import { getToken } from "../utils/auth.js";



export default class BoardService {

    constructor() {
        this.store = new BoardStore();
        this.token = getToken()?.substring(3);
    }

    async getBoardByWorkspace(id) {
        try{
            const data = await this.store.getBoardByWorkspace(id, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error getting boards");
        }
    }

    async getBoard(id) {
        try{
            const data = await this.store.getBoard(id, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error in getting board");
        }
    }

}
