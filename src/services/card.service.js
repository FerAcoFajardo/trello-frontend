import CardStore from "../stores/card.stores.js";
import ServiceError from "../errors/errors.js"
import { getToken } from "../utils/auth.js";



export default class CardService {

    constructor() {
        this.store = new CardStore();
        this.token = getToken();
    }

    async createCard(title, columnId) {
        try{
            const data = await this.store.createCard(title, columnId, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error creating card");
        }
    }

    async getCardsByColumn(columnId) {
        try{
            const data = await this.store.getCardsByColumn(columnId, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error getting cards by column");
        }
    }

    async updateCard(id, title, description, columnId, deadlineDate,){
        try{
            const data = await this.store.updateCard(id, title, description, columnId, deadlineDate, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error in updating card");
        }
    }

    async updateCardColumn(id, columnId, position){
        try{
            const data = await this.store.updateCardColumn(id, columnId, position, this.token);
            return data;
        }catch (e) {
            console.log(e)
            throw new ServiceError("Error in updating card column");
        }
    }


}
