import {WorkerService} from '../services/WorkerService';
import {
    Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put,
    UseBefore
} from "routing-controllers";
import {Worker} from "../models/Worker";
import {ErrorHandlerMiddleware} from "../middlewares/ErrorHandlerMiddleware";
import {AdminRoleCheckingMiddleware} from "../middlewares/AdminRoleCheckingMiddleware";
import {TokenCheckingMiddleware} from "../middlewares/TokenCheckingMiddleware";
import {AdminOrUserRolesCheckingMiddleware} from "../middlewares/AdminOrUserRolesCheckingMiddleware";

@JsonController("/worker")
export class WorkerController{
    private workerService:WorkerService;

    constructor(workerService:WorkerService){
        this.workerService = workerService;
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Post("/add")
    public add(@Body() worker:Worker):Promise<Worker>{
        console.log("POST request to add one worker " + worker);
        return this.workerService.add(worker);
    }

    @UseBefore(AdminOrUserRolesCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getReady")
    public getAllOrderedByDutyWithStatusReady():Promise<Worker[]>{
        console.log("GET request to get all workers with status ready ordered by duty with status ready");
        return this.workerService.getAllOrderedByDutyWithStatusReady();
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getFired")
    public getAllWithStatusFired():Promise<Worker[]>{
        console.log("GET request to get all workers with status fired");
        return this.workerService.getAllWithStatusFired();
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/get/:id")
    public getOne(@Param("id") id:number):Promise<Worker>{
        console.log("GET request to get one worker by id=[" + id + "]");
        return this.workerService.getOne(id);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Put("/update")
    public update(@Body() worker:Worker):Promise<Worker>{
            console.log("PUT request to update worker " + worker);
        return this.workerService.update(worker);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Delete("/delete/:id")
    public deleteById(@Param("id") id:number):Promise<Worker>{
        console.log("DELETE request to delete worker by id=[" + id + "]");
        return this.workerService.deleteById(id);
    }

    @UseBefore(AdminOrUserRolesCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getByCurrentDuty")
    public getByCurrentDuty():Promise<Worker>{
        console.log("GET request to get worker by current duties");
        return this.workerService.getByCurrentDateDuty();
    }
}