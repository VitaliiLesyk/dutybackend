import {Body, Delete, Get, JsonController, Post, Put, Param} from 'routing-controllers';
import {Task} from "../models/Task";
import {TaskService} from "../services/TaskService";

@JsonController("/tasks")
export class TaskController{

    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    @Post("/add")
    public add(@Body() task: Task){
        console.log("TaskController: POST request to create one " + task);
        return this.taskService.add(task);
    };

    @Get("/get")
    public getAll(){
        console.log("TaskController: GET request to get all tasks");
        return this.taskService.getAll();
    }

    @Get("/get/:id")
    public getById(@Param("id") id:number){
        console.log("TaskController: GET request to get task by id=[" + id + "]");
        return this.taskService.getOne(id);
    }

    @Put("/update/:id")
    public update(@Param("id") id:number,
                  @Body() task:Task){
        console.log("TaskController: PUT request to update task by id=[" + id + "]");
        return this.taskService.update(id, task);
    }

    @Delete("/delete/:id")
    public deleteById(@Param("id") id:number){
        console.log("TaskController: DELETE request to delete task by id=[" + id + "]");
        return this.taskService.deleteById(id);
    }
}
