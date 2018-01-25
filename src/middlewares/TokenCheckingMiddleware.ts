import {ExpressMiddlewareInterface} from "routing-controllers";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {config} from "../config";

export class TokenCheckingMiddleware implements ExpressMiddlewareInterface{
    public use(req:express.Request, res: express.Response, next: express.NextFunction){
        let token = req.headers['x-access-token'].toString();
        console.log('Token provided=[' + token + "]");
        if(token){
            jwt.verify(token, config.secret, (err, decoded)=>{
                if(err){
                    console.error("Error while verify: " + err.toString());
                    throw err;
                }
                else{
                    console.log("Token passed=[" + token + "]");
                    next();
                }
            });
        }
        else{
            throw new Error('No token provided');
        }
    }
}