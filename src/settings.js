// Open json file that is in the root of the project and add this:



export default class EnvVariables{

    

    constructor(){
        this.API_URL = process.env.REACT_APP_API_URL
;

        if (typeof EnvVariables.instance === "object") {
            return EnvVariables.instance;
        }

        EnvVariables.instance = this;
        return this;
    }
}

