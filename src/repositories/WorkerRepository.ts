import {Repository} from "typeorm";
import {Worker} from "../models/Worker";
import {EntityRepository} from "typeorm/decorator/EntityRepository";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker>{

}