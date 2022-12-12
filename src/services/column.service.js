import ColumnStore from "../stores/column.stores.js";
import ServiceError from "../errors/errors.js"
import { getToken } from "../utils/auth.js";



export default class ColumnService {

    constructor() {
        this.store = new ColumnStore();
        this.token = getToken();
    }

    async createColumn(title, boardId) {
        try{
            const data = await this.store.createColumn(title, boardId, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error creating column");
        }
    }

    async getColumn(id) {
        try{
            const data = await this.store.getColumn(id, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error getting column");
        }
    }

    async getColumnsByBoard(id) {
        try{
            const data = await this.store.getColumnsByBoard(id, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error getting columns");
        }
    }

    async updateColumnTitle(id, title, boardId) {
        try{
            const data = await this.store.updateColumnTitle(id, title, boardId, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error updating column title");
        }
    }

}
