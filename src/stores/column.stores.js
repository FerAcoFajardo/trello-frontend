import EnvVariables from "../settings.js";


const env = new EnvVariables();

export default class WorkspaceStore{

    constructor(){
        this.URL = env.API_URL;
    }

    async createColumn(title, boardId, token){
        const request = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                board: boardId,
            })
        }
        const result = await fetch(`${this.URL}/columns`, request);

        return result;
    }


    async getColumnsByBoard(id, token){
            
        const request = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/boards/${id}/columns`, request);

        return result;
    }

    async updateColumTitle(id, title, token){
        const request = {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        }
        const result = await fetch(`${this.URL}/columns/${id}`, request);

        return result;
    }

}
