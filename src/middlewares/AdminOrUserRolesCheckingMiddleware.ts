import * as express from 'express';
import {ExpressMiddlewareInterface} from "routing-controllers";
import {Roles} from "../enums/Roles";
import {TokenRoleChecker} from "../TokenRoleChecker";

export class AdminOrUserRolesCheckingMiddleware implements ExpressMiddlewareInterface{
    public use(req:express.Request, res:express.Response, next:express.NextFunction){
        let token = req.headers['x-access-token'].toString();
        if(TokenRoleChecker.check(token, Roles.USER)){
            next();
        }
        if(TokenRoleChecker.check(token, Roles.ADMIN)){
             next();
        }
    }
}