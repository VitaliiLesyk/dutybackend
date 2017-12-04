import {Repository} from "typeorm";
import {Task} from "../models/Task";
import {EntityRepository} from "typeorm/decorator/EntityRepository";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

}