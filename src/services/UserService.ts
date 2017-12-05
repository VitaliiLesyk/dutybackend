import {Service} from "typedi";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {UserDto} from "../dto/UserDto";
import {RoleEnum} from "../enums/RoleEnum";

@Service()
export class UserService{
    private workerRepository:WorkerRepository;

    constructor(@OrmRepository() workerRepository:WorkerRepository){
        this.workerRepository = workerRepository;
    }

    public login(user: UserDto):UserDto{
        console.log("UserService to login user " + user);
        if(this.checkForAdmin(user)){
            user.setRole(RoleEnum.ADMIN);
            return user;
        }
        if(this.checkForUser(user)){
            user.setRole(RoleEnum.USER);
            return user;
        }
        user.setRole(RoleEnum.GUEST);
        return user;
    }

        private checkForAdmin(user:UserDto):boolean{
            console.log("checkForAdmin");
            let adminName:string = "admin";
            let adminPassword:string = "10admin01";
            return user.getName() === adminName &&
                   user.getPassword() === adminPassword;
        }

        private checkForUser(user:UserDto):Promise<boolean> {
            console.log("checkForUser");
            return this.workerRepository.findOneByEmailAndPassword(user.getName(), user.getPassword()).then(found => {
                return typeof found !== 'undefined' && found !== null;
            });
        }
}