import { Get, JsonController, Param} from "routing-controllers";
import {DutyService} from "../services/DutyService";
import {Duty} from "../models/Duty";
import {Service} from "typedi";

@JsonController("/duty")
export class DutyController{

    private dutyService:DutyService;

    constructor(@Service() dutyService:DutyService){
        this.dutyService = dutyService;
    }

    @Get("/get")
    public getAll():Promise<Duty[]>{
        console.log("GET request: to get all duties");
        return this.dutyService.getAll();
    }

    @Get("/getByWorkerId/:workerId")
    public getByWorkerId(@Param("workerId") workerId: number): Promise<Duty[]>{
        console.log("GET request: to get duties by workerId=[" + workerId + "]");
        return this.dutyService.getByWorkerId(workerId);
    }

    @Get("/getByDate/:date")
    public getByDate(@Param("date") date:Date): Promise<Duty>{
        console.log("GET request: to get duty by date=[" + date.toString("d-M-yyyy") + "]");
        return this.dutyService.getByDate(date);
    }
}