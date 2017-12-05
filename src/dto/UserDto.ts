import {RoleEnum} from "../enums/RoleEnum";
import {IsEmpty} from "class-validator";

export class UserDto{
    private name:string;
    private password:string;
    @IsEmpty()
    private role: RoleEnum;

    public setName(name:string):void{
        this.name = name;
    }

    public getName():string{
        return this.name;
    }

    public setPassword(password:string):void{
        this.password = password;
    }

    public getPassword():string{
        return this.password;
    }

    public setRole(role:RoleEnum):void{
        this.role = role;
    }

    public getRole():RoleEnum{
        return this.role;
    }

    public toString():string{
        return "UserDto: {" +
                "name=[" + this.name + "]," +
                "password=[" + this.password + "]" +
                "}"
    }
}