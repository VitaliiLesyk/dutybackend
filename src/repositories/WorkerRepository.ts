import {Repository} from "typeorm";
import {Worker} from "../models/Worker";
import {EntityRepository} from "typeorm/decorator/EntityRepository";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker>{
    public findOneByEmailAndPassword(email:string, password:string): Promise<Worker>{
        return this.createQueryBuilder("worker")
            .select()
            .from(Worker, "worker")
            .where("worker.email LIKE :email AND worker.password LIKE :password", {email: email, password:password})
            .getOne();
    }
}