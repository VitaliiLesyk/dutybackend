import {CronJob} from "cron";
import {DutyService} from "../services/DutyService";
import "datejs";

export class DutyCreateSchedule{

    private job:CronJob;
    private dutyService:DutyService;

    constructor(dutyService:DutyService){
        this.job = new CronJob({
            cronTime: "00 00 00 * * 1", //every monday at 00:00:00
            onTick: ()=>{
                this.tick();
            },
            start: false,
            timeZone: 'Europe/Warsaw'
        });
        this.dutyService = dutyService;
    }

    private tick():void{

        console.log("DutyCreateSchedule: tick method to create new duty on date=[" + Date.today().toString("d-M-yyyy") + "]");

        this.dutyService.getByDate(Date.today()).then(found=>{
            if(typeof found !== 'undefined') {
                let worker = found.getWorker();
                this.dutyService.deleteByWorkerId(worker.getId());
                this.dutyService.createOneByWorker(worker);
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