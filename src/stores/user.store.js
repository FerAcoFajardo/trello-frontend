import EnvVariables from "../settings.js";

const env = new EnvVariables();

export default class UserStore{

    constructor(){
        this.URL = env.API_URL;
    }


    async login(email, password){

        const result = await fetch(`${this.URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        return result;

    }

    async createUser(profiePicture, name, firstSurname, secondSurname, birthdate, telephone, email, password){
        console.log("profiePicture: ", profiePicture);

        const formData = new FormData();

        formData.append('img_profile', profiePicture);
        formData.append('name', name);
        formData.append('first_surname', firstSurname);
        formData.append('second_surname', secondSurname);
        formData.append('email', email);
        formData.append('phone', telephone);
        formData.append('password', password);
        formData.append('birthdate', birthdate);

        formData.set('Content-Type', 'multipart/form-data');

        
        const result = await fetch(`${this.URL}/users`, formData);

        return result;
    }
}