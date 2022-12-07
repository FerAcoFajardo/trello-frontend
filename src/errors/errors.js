

class ServiceError extends Error{
    constructor(instance, message){
        super(message); 
        this.instance = instance;
        this.name = "ServiceError";
        this._message = message;
    }
}