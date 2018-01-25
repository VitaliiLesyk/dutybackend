import {Roles} from "./enums/Roles";
import * as jwt from 'jsonwebtoken';

export class TokenRoleChecker{
    public static check(token:string, role1: Roles, role2?: Roles){
        let decoded = jwt.decode(token);
        let decToStr = JSON.stringify(decoded);
        let decToJSON = JSON.parse(decToStr);
        let tokenRole = decToJSON['role'];
        if(tokenRole === role1){
            console.log("Access permitted for user with role=[" + tokenRole + "]");
            return true;
        }else{
            if(tokenRole === role2){
                console.log("Access permitted for user with role=[" + tokenRole + "]");
                return true;
            }
            else{
                let err = "Error: Access denied for user with role=[" + tokenRole + "]";
                console.error(err);
                throw new Error(err);
            }
        }
    }
}