import { Get, JsonController, Param} from "routing-controllers";
import {DutyService} from "../services/DutyService";
import {Duty} from "../models/Duty";

@JsonController("/duty")
export class DutyController{

    private dutyService:DutyService;

    constructor(dutyService:DutyService){
        this.dutyService = dutyService;
    }

    @Get("/get")
    public getAll():Promise<Duty[]>{
        console.log("GET request: to get all duties");
        return this.dutyService.getAll();
    }

    @Get("/getByWorkerId/:workerId")
    public getByWorkerId(@Param("workerId") workerId: number):Promise<Duty[]>{
        console.log("GET request: to get duties by workerId=[" + workerId + "]");
        return this.dutyService.getByWorkerId(workerId);
    }

    @Get("/getByDate/:date")
    public getByDate(@Param("date") date:Date):Promise<Duty>{
        console.log("GET request: to get duties by date=[" + date.toString("yyyy-MM-dd") + "]");
        return this.dutyService.getByDate(date);
    }

    @Get("/swap/:id1/and/:id2")
    public swapWithStatusReadyByWorkersIds(@Param("id1") workerId1: number,
                                           @Param("id2") workerId2: number):Promise<Duty[]>{
        console.log("GET request to change duties of worker1(id=[" + workerId1 + "]) with worker2(id=[" + workerId2 + "])");
        return this.dutyService.swapWithStatusReadyByWorkerIds(workerId1, workerId2);
    }
}