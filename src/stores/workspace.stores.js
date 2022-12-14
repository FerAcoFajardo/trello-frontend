import EnvVariables from "../settings.js";

const env = new EnvVariables();

export default class WorkspaceStore{

    constructor(){
        this.URL = env.API_URL;
    }


    async getWorkspaces(token){
        const request = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/workspaces`, request);

        return result;

    }

    async getWorkspace(id, token){
            
        const request = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/workspaces/${id}`, request);

        return result;
    }

    async createWorkspace(title, token){
        const request = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                owner: true
            })
        }

        const result = await fetch(`${this.URL}/workspaces`, request);

        return result;
    }

    async deleteWorkspace(id, token){
        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    
        const result = await fetch(`${this.URL}/workspaces/${id}`, request);
    
        return result;
    }

    async updateWorkspace(id, title, token){
        const request = {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        }

        const result = await fetch(`${this.URL}/workspaces/${id}`, request);

        return result;
    }



}
