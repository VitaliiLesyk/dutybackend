import { Service } from 'typedi';
import {TaskRepository} from "../repositories/TaskRepository";
import {Task} from "../models/Task";
import {OrmRepository} from "typeorm-typedi-extensions";
import {HttpError} from "routing-controllers";
import {IdError} from "../errors/IdError";

@Service()
export class TaskService{

    private taskRepository:TaskRepository;

    constructor(@OrmRepository() taskRepository:TaskRepository){
        this.taskRepository = taskRepository;
    }

    public add(task : Task):Promise<Task>{
        console.log("TaskService: to add one task");
        if(!this.idIsNull(task.getId()))
            throw new IdError("Id should be empty!");

        return this.taskRepository.save(task);
    }

    public getOne(id: number):Promise<Task>{
        console.log("TaskService: to get one task by id=[" + id + "]");
        return this.taskRepository.findOneById(id);
    }

    public getAll():Promise<Task[]>{
        console.log("TaskService: to get all tasks");
        return this.taskRepository.find();
    }

    public update(task:Task):Promise<Task>{
        console.log("TaskService: to update task " + task);

        if(this.idIsNull(task.getId()))
            throw new IdError("Id should not be empty!");

        return this.taskRepository.findOneById(task.getId()).then(found=>{
            if(typeof found !== 'undefined') {
                return this.taskRepository.save(task);
            }
            else
                throw new HttpError(400, "NotFoundError");
        });
    }

    public deleteById(id: number):Promise<Task>{
        console.log("TaskService: to delete task by id=[" + id + "]");
        return this.taskRepository.findOneById(id).then((found)=>{
            this.taskRepository.delete(id);
            return found;
        });
    }

    private idIsNull(id:number):boolean{
        return id===null || typeof id === 'undefined';
    }
}