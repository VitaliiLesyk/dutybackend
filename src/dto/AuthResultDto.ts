export class AuthResultDto{
    private status: boolean;
    private token: string;

    constructor(status:boolean, token:string){
        this.token = token;
        this.status = status;
    }

    public setStatus(status:boolean):void{
        this.status = status;
    }

    public getStatus():boolean{
        return this.status;
    }

    public setToken(token:string):void{
        this.token = token;
    }

    public getToken():string{
        return this.token;
    }
}