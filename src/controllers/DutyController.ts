import {Get, JsonController, Param, UseBefore} from "routing-controllers";
import {DutyService} from "../services/DutyService";
import {Duty} from "../models/Duty";
import {AdminRoleCheckingMiddleware} from "../middlewares/AdminRoleCheckingMiddleware";
import {TokenCheckingMiddleware} from "../middlewares/TokenCheckingMiddleware";

@JsonController("/duty")
export class DutyController{

    private dutyService:DutyService;

    constructor(dutyService:DutyService){
        this.dutyService = dutyService;
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/get")
    public getAll():Promise<Duty[]>{
        console.log("GET request: to get all duties");
        return this.dutyService.getAll();
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getAllByWorkerId/:workerId")
    public getAllByWorkerId(@Param("workerId") workerId: number):Promise<Duty[]>{
        console.log("GET request: to get all duties by workerId=[" + workerId + "]");
        return this.dutyService.getAllByWorkerId(workerId);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getPassedByWorkerId/:workerId")
    public getPassedByWorkerId(@Param("workerId") workerId: number):Promise<Duty[]>{
        console.log("GET request: to get passed duties by workerId=[" + workerId + "]");
        return this.dutyService.getPassedByWorkerId(workerId);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getReadyByWorkerId/:workerId")
    public getReadyByWorkerId(@Param("workerId") workerId: number):Promise<Duty>{
        console.log("GET request: to get duty with status ready by workerId=[" + workerId + "]");
        return this.dutyService.getReadyByWorkerId(workerId);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/getByDate/:date")
    public getByDate(@Param("date") date:Date):Promise<Duty>{
        console.log("GET request: to get duties by date=[" + date.toString("yyyy-MM-dd") + "]");
        return this.dutyService.getByDate(date);
    }

    @UseBefore(AdminRoleCheckingMiddleware)
    @UseBefore(TokenCheckingMiddleware)
    @Get("/swap/:id1/and/:id2")
    public swapWithStatusReadyByWorkersIds(@Param("id1") workerId1: number,
                                           @Param("id2") workerId2: number):Promise<Duty[]>{
        console.log("GET request to change duties of worker1(id=[" + workerId1 + "]) with worker2(id=[" + workerId2 + "])");
        return this.dutyService.swapWithStatusReadyByWorkerIds(workerId1, workerId2);
    }
}