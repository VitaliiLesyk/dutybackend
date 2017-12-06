import {WorkerService} from '../services/WorkerService';
import {Body, Delete, Get, JsonController, Param, Post, Put} from "routing-controllers";
import {Worker} from "../models/Worker";

@JsonController("/worker")
export class WorkerController{
    private workerService:WorkerService;

    constructor(workerService:WorkerService){
        this.workerService = workerService;
    }

    @Post("/add")
    public add(@Body() worker:Worker):Promise<Worker>{
        console.log("POST request to add one worker " + worker);
        return this.workerService.add(worker);
    }

    @Get("/get")
    public getAll():Promise<Worker[]>{
        console.log("GET request to get all workers");
        return this.workerService.getAll();
    }

    @Get("/get/:id")
    public getOne(@Param("id") id:number):Promise<Worker>{
        console.log("GET request to get one worker by id=[" + id + "]");
        return this.workerService.getOne(id);
    }

    @Put("/update")
    public update(@Body() worker:Worker):Promise<Worker>{
        console.log("PUT request to update worker " + worker);
        return this.workerService.update(worker);
    }

    @Delete("/delete/:id")
    public deleteById(@Param("id") id:number):Promise<Worker>{
        console.log("DELETE request to delete worker by id=[" + id + "]");
        return this.workerService.deleteById(id);
    }

    @Get("/getByCurrentDuty")
    public getByCurrentDuty():Promise<Worker>{
        console.log("GET request to get worker by current duty");
        return this.workerService.getByCurrentDuty();
    }
}