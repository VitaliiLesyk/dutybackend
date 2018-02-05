import {CronJob} from "cron";
import {DutyService} from "../services/DutyService";
import "datejs";
import {WorkerService} from "../services/WorkerService";

export class DutyCreateSchedule{

    private job:CronJob;
    private dutyService:DutyService;
    private workerService:WorkerService;

    constructor(workerService:WorkerService,
                dutyService:DutyService){
        this.job = new CronJob({
            cronTime: "00 00 21 * * 0", //every sunday at 21:00:00
            onTick: ()=>{
                this.tick();
            },
            start: false,
            timeZone: 'Europe/Warsaw'
        });
        this.dutyService = dutyService;
        this.workerService = workerService;
    }

    private tick():void{
        console.log("DutyCreateSchedule: tick method to create new duties on date=[" + Date.today().toString("d-M-yyyy") + "]");
        this.workerService.getByCurrentDateDuty().then(found=>{
            if(typeof found !== 'undefined' && found !== null) {
                this.dutyService.createOneByWorker(found, false);
            }
        });
    }

    public start():void{
        if(typeof this.job.running === 'undefined') {
            this.job.start();
            console.log("DutyCreateSchedule: job started!");
        }
    }

}