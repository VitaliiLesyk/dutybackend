import {Service} from "typedi";
import {Duty} from "../models/Duty";
import {Worker} from "../models/Worker";
import {DutyRepository} from "../repositories/DutyRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {WorkerRepository} from "../repositories/WorkerRepository";


@Service()
export class DutyService {

    private workerRepository: WorkerRepository;
    private dutyRepository: DutyRepository;

    constructor(@OrmRepository() workerRepository: WorkerRepository,
                @OrmRepository() dutyRepository: DutyRepository) {
        this.workerRepository = workerRepository;
        this.dutyRepository = dutyRepository;
    }

    public createOneByWorker(worker: Worker):void{
        console.log("DutyService : to create one duty by " + worker);
        this.workerRepository.find().then(found => {
            let workersNumber: number = found.length - 1;
            let startDate = this.createStartDate(workersNumber);
            let duty: Duty = this.createDuty(worker, startDate);
            this.dutyRepository.save(duty);
        });
    }

        private createStartDate(weeksToAdd: number):Date{
            let today:Date = Date.today();
            let dayOfWeek:number = today.getDay();
            return today.addDays(1-dayOfWeek).addWeeks(weeksToAdd);
        }

        private createDuty(worker: Worker, startDate: Date): Duty {
            let duty: Duty = new Duty();
            let overDate = new Date(startDate);
            overDate.addDays(Duty.DUTY_DAYS_NUMBER - 1);
            duty.setStartDate(startDate);
            duty.setOverDate(overDate);
            duty.setWorker(worker);
            return duty;
        }

    public getAll():Promise<Duty[]> {
        console.log("DutyService: to get all duties");
        return this.dutyRepository.find();
    }

    public getByWorkerId(workerId: number):Promise<Duty> {
        console.log("DutyService: to get duties by workerId=[" + workerId + "]");
        return this.dutyRepository.findByWorkerId(workerId);
    }

    public getByDate(date: Date):Promise<Duty> {
        console.log("DutyService: to get duty by date=[" + date.toString("yyyy-MM-dd") + "]");
        return this.dutyRepository.findByDate(date);
    }

    public getCurrentDuty():Promise<Duty> {
        console.log("DutyService: to get current duty");
        return this.dutyRepository.findByDate(Date.today());
    }

    public deleteByWorkerId(workerId: number) {
        console.log("DutyService: delete by worker id=[" + workerId + "]");
        this.dutyRepository.findByWorkerId(workerId).then(deleted =>{
            this.dutyRepository.deleteByWorkerId(workerId);
            let oldStartDate = deleted.getStartDate();
            this.dutyRepository.find().then(found=>{
                this.findDutyAndChange(found, oldStartDate);
            });
        });
    }

        private findDutyAndChange(duties:Duty[], oldDate: Date):void{
            for(let i:number = 0;i<duties.length;i++){
                if(duties[i].getStartDate() > oldDate){
                    this.changeDuty(duties[i]);
                }
            }
        }

        private changeDuty(duty: Duty):void{
            let newStartDate:Date = new Date(duty.getStartDate());
            newStartDate.addDays(-Duty.DUTY_DAYS_NUMBER);
            duty.setStartDate(newStartDate);

            let newOverDate:Date = new Date(duty.getOverDate());
            newOverDate.addDays(-Duty.DUTY_DAYS_NUMBER);
            duty.setOverDate(newOverDate);

            this.dutyRepository.save(duty);
        }
}