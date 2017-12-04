import { Service } from 'typedi';
import {TaskRepository} from "../repositories/TaskRepository";
import {Task} from "../models/Task";
import {OrmRepository} from "typeorm-typedi-extensions";
import {HttpError} from "routing-controllers";

@Service()
export class TaskService{

    private taskRepository:TaskRepository;

    constructor(@OrmRepository() taskRepository:TaskRepository){
        this.taskRepository = taskRepository;
    }

    public add(task : Task) : Promise<Task>{
        console.log("TaskService: to add one task");
        return this.taskRepository.save(task);
    }

    public getOne(id: number) : Promise<Task>{
        console.log("TaskService: to get one task by id=[" + id + "]");
        return this.taskRepository.findOne({where:{id:id}});
    }

    public getAll() : Promise<Task[]>{
        console.log("TaskService: to get all tasks");
        return this.taskRepository.find();
    }

    public update(id: number, task:Task) : Promise<Task>{
        console.log("TaskService: to update task with id=[" + id + "]");
        return this.taskRepository.findOne({where:{id:id}}).then(found=>{
            if(typeof found !== 'undefined') {
                task.id = id;
                return this.taskRepository.save(task);
            }
            else
                throw new HttpError(400, "NotFoundError");
        });
    }

    public deleteById(id: number) : Promise<Task>{
        console.log("TaskService: to delete task by id=[" + id + "]");
        return this.taskRepository.findOne({where:{id:id}}).then((found)=>{
            this.taskRepository.delete(id);
            return found;
        });
    }
}