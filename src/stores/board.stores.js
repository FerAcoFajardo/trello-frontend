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

}
