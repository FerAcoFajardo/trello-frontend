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

    async deleteWorkspace(id) {
        try{
            const data = await this.store.deleteWorkspace(id, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error deleting a workspace");
        }
    }

    async updateWorkspace(id, title) {
        try{
            const data = await this.store.updateWorkspace(id, title, this.token);
            return data;
        }catch (e) {
            throw new ServiceError("Error deleting a workspace");
        }
    }

}
