import WorkspaceStore from "../stores/workspace.stores.js";
import ServiceError from "../errors/errors.js"
import { getToken } from "../utils/auth.js";



export default class WorkspaceService {

    constructor() {
        this.store = new WorkspaceStore();
        this.token = getToken();
    }

    async getWorkspaces() {
        try{
            console.log(this.token.substring(3));
            const data = await this.store.getWorkspaces(this.token.substring(3));
            return data;
        }catch (e) {
            throw new ServiceError("Error in login");
        }
    }


}
