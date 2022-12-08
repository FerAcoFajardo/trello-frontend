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
                'Authorization': 'Bearer'+token,
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

    async updateCard(id, title, description, columnId, deadlineDate, token){
                
        const request = {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer'+token,
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

    async updateCardColun(id, columnId, token){
                    
        const request = {
            method: 'PATCH',
            headers: {  
                'Authorization': 'Bearer'+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                column: columnId,
            })
        }

        const result = await fetch(`${this.URL}/cards/${id}`, request);

        return result;

    }
    

}
