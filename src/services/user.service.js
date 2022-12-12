import UserStore from "../stores/user.store.js";
import ServiceError from "../errors/errors.js"
// import Swal from "sweetalert2";

import { getToken, removeToken } from "../utils/auth.js";
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

    async logout(){
        try{
            if(getToken()){
                removeToken();
            // }else{
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: 'You are not logged in!',
            //     })
            }
            window.location.href = "/SignIn";
        }catch (e) {
            throw new ServiceError("Error in logout");
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
