import WorkspaceStore from "../stores/workspace.stores.js";
import ServiceError from "../errors/errors.js"
import { getToken } from "../utils/auth.js";



export default class WorkspaceService {

    constructor() {
        this.store = new WorkspaceStore();
        this.token = getToken()?.substring(3);
    }

    async getWorkspaces() {
        try{
            const data = await this.store.getWorkspaces(this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error in creation of workspace");
        }
    }

    async getWorkspace(id) {
        try{
            const data = await this.store.getWorkspace(id, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error in creation of workspace");
        }
    }

    async createWorkspace(title) {
        try{
            const data = await this.store.createWorkspace(title, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error in creation of workspace");
        }
    }

}
