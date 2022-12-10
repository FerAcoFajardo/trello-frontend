import EnvVariables from "../settings.js";


const env = new EnvVariables();

export default class WorkspaceStore{

    constructor(){
        this.URL = env.API_URL;
    }


    async getBoardByWorkspace(id, token){
            
        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer'+token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/workspaces/${id}/boards`, request);

        return result;
    }

    async getBoard(id, token){
        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer'+token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/boards/${id}`, request);

        return result;
    }

    async createBoard(title, workspaceId, token){
        const request = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer'+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                workspace: workspaceId
            })
        }

        const result = await fetch(`${this.URL}/boards`, request);

        return result;

    }

    async deleteBoard(id, token){
        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer'+token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/boards/${id}`, request);

        return result;

    }
}
