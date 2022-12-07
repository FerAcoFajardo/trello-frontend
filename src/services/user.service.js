import UserStore from "../stores/user.store.js";
import ServiceError from "../errors/errors.js"


export default class UserService {

    constructor() {
        this.userStore = new UserStore();
    }

    async login(email, password) {
        try{
            const data = await this.userStore.login(email, password);
            return data;
        }catch (e) {
            throw new ServiceError("Error in login");
        }
    }

    async createUser(profiePicture, name, firstSurname, secondSurname, birthdate, telephone, email, password) {
        try{
            const data = await this.userStore.createUser(profiePicture, name, firstSurname, secondSurname, birthdate, telephone, email, password);
            return data;
        }catch (e) {
            throw new ServiceError("Error in createUser");
        }
    }

}
