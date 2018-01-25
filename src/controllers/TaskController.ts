import {Body, Delete, Get, JsonController, Post, Put, Param, UseBefore} from 'routing-controllers';
import {Task} from "../models/Task";
import {TaskService} from "../services/TaskService";
import {TokenCheckingMiddleware} from "../middlewares/TokenCheckingMiddleware";
import {AdminRoleCheckingMiddleware} from "../middlewares/AdminRoleCheckingMiddleware";
import {AdminOrUserRolesCheckingMiddleware} from "../middlewares/AdminOrUserRolesCheckingMiddleware";

@JsonController("/task")
export class TaskController{

    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Post("/add")
    public add(@Body() task: Task) : Promise<Task>{
        console.log("TaskController: POST request to create one " + task);
        return this.taskService.add(task);
    };

    @UseBefore(AdminOrUserRolesCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/get")
    public getAll():Promise<Task[]>{
        console.log("TaskController: GET request to get all tasks");
        return this.taskService.getAll();
    }

    @UseBefore(AdminOrUserRolesCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/get/:id")
    public getById(@Param("id") id:number):Promise<Task>{
        console.log("TaskController: GET request to get task by id=[" + id + "]");
        return this.taskService.getOne(id);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Put("/update")
    public update(@Body() task:Task):Promise<Task>{
        console.log("TaskController: PUT request to update task " + task);
        return this.taskService.update(task);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Delete("/delete/:id")
    public deleteById(@Param("id") id:number):Promise<Task>{
        console.log("TaskController: DELETE request to delete task by id=[" + id + "]");
        return this.taskService.deleteById(id);
    }
}
