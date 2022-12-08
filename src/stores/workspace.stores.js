import {API_URL} from "../conf/settings.js";

export default class WorkspaceStore{

    constructor(){
        this.URL = API_URL;
    }


    async getWorkspaces(token){

        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer'+token,
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch(`${this.URL}/workspaces`, request);

        return result;

    }

}
