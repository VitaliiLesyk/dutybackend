import {Body, HttpCode, JsonController, OnUndefined, Post} from "routing-controllers";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {UserDto} from "../dto/UserDto";
import {config} from "../config";
import {Roles} from "../enums/Roles";
import * as jwt from "jsonwebtoken";

@JsonController()
export class AuthController{

    private workerRepository: WorkerRepository;

    constructor(@OrmRepository() workerRepository: WorkerRepository){
        this.workerRepository = workerRepository;
    }

    @Post("/authenticate")
    public auth(@Body() user:UserDto){
        console.log("POST request to authenticate user=[" + user + "]");
        if(user.getUsername() === config.admin && user.getPassword() === config.password){
            return this.createToken(Roles.ADMIN);
        }
        return this.workerRepository.findOneByEmail(user.getUsername()).then((worker)=>{
            if(worker && worker.getPassword() === user.getPassword()){
                return this.createToken(Roles.USER);
            }
            else{
                throw new Error("Can't login. Incorrect data.");
            }
        });
    }

    private createToken(role:Roles){
        const payload = {role: role};
        let token = jwt.sign(payload, config.secret, {expiresIn: 1440});
        console.log("Token created=[" + token + "]");
        return {status: true, token: token};
    }

}