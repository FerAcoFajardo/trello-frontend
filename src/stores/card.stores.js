import EnvVariables from "../settings.js";


const env = new EnvVariables();

export default class WorkspaceStore{

    constructor(){
        this.URL = env.API_URL;
    }


    async createCard(title, columnId, token){
                
        const request = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                column: columnId,
            })
        }

        const result = await fetch(`${this.URL}/cards`, request);

        return result;

    }

    async getCardsByColumn(columnId, token){
        const request = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/columns/${columnId}/cards`, request);

        return result;
    }

    async updateCard(id, title, description, columnId, deadlineDate, token){
                
        const request = {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                column: columnId,
                deadlineDate: deadlineDate,
            })
        }

        const result = await fetch(`${this.URL}/cards/${id}`, request);

        return result;

    }

    async updateCardColumn(id, columnId, position, token){
                    
        const request = {
            method: 'PATCH',
            headers: {  
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                column: columnId,
                position: position,
            })
        }

        const result = await fetch(`${this.URL}/cards/${id}`, request);

        return result;

    }
    

}
