
import {HttpError} from "routing-controllers";

export class IdError extends HttpError{

    constructor(message: string){
        super(400, message);
    }
}