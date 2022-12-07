import {API_URL} from "../conf/settings.js";

export default class UserStore{

    constructor(){
        this.URL = API_URL;
    }


    async login(email, password){
        console.log("email: ", email);
        console.log("password:", password);
        console.log("API_URL: ", this.URL);

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

        const data = await result.json();

        console.log("data: ", data);

        return data;

    }

    async createUser(profiePicture, name, firstSurname, secondSurname, birthdate, telephone, email, password){
        console.log("name: ", name);
        console.log("first_surname: ", firstSurname);
        console.log("second_surname: ", secondSurname);
        console.log("email: ", email);
        console.log("phone: ", telephone);
        console.log("password: ", password);
        console.log("birthdate: ", birthdate);
        console.log("profiePicture: ", profiePicture);
        
        const result = await fetch(`${this.URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                first_surname: firstSurname,
                second_surname: secondSurname,
                email: email,
                phone: telephone,
                password: password,
                birthdate:birthdate
            })
        });

        const data = await result.json();
        return data;
    }
}