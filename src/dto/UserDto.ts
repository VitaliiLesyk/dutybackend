import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class UserDto{
    @IsEmail()
    private username:string;
    @IsNotEmpty({message:"Password field should be not empty"})
    @Length(8, 20, {message:"Password field should have size=[8-20]"})
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