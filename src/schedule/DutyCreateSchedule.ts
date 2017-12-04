import {CronJob} from "cron";
import {DutyService} from "../services/DutyService";
import "datejs";

export class DutyCreateSchedule{

    private job:CronJob;
    private dutyService:DutyService;

    constructor(dutyService:DutyService){
        this.job = new CronJob({
            cronTime: "00 00 00 * * 0-6",
            onTick: ()=>{
                this.tick();
            },
            start: false,
            timeZone: 'Europe/Warsaw'
        });
        this.dutyService = dutyService;
    }

    private tick():void{
        let today:Date = Date.today();

        console.log("DutyCreateSchedule: tick method to create new duty on date=[" + today.toString("d-M-yyyy") + "]");

        this.dutyService.getByDate(today).then(found=>{
            if(typeof found !== 'undefined') {
                this.dutyService.createOneByWorker(found.worker);
            }
        });
    }

    public start(){
        if(typeof this.job.running === 'undefined') {
            this.job.start();
            console.log("DutyCreateSchedule: job started!");
        }
    }

}