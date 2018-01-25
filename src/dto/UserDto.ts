export class UserDto{
    private username:string;
    private password:string;

    constructor(username:string, password:string){
        this.password = password;
        this.username = username;
    }

    public setUsername(username:string):void{
        this.username = username;
    }

    public getUsername():string {
        return this.username;
    }

    public setPassword(password:string):void{
        this.password = password;
    }

    public getPassword():string{
        return this.password;
    }

    public toString():string{
        return "username=[" + this.username + "], " +
                "password=[" + this.password + "]";
    }
}