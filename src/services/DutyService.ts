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
        console.log("DutyService: to get duty by workerId=[" + workerId + "]");
        return this.dutyRepository.findByWorkerId(workerId).then(found=>{
            return found;
        });
    }

    public getByDate(date: Date):Promise<Duty> {
        console.log("DutyService: to get duty by date=[" + date.toString("yyyy-MM-dd") + "]");
        return this.dutyRepository.findByDate(date);
    }

    public getCurrentDuty():Promise<Duty> {
        console.log("DutyService: to get current duty");
        return this.dutyRepository.findByDate(Date.today());
    }

    public deleteByWorkerId(workerId: number):Promise<void>{
        console.log("DutyService: delete by worker id=[" + workerId + "]");
        return this.dutyRepository.findByWorkerId(workerId).then(deleted =>{
            this.dutyRepository.deleteByWorkerId(workerId);
            let oldStartDate = deleted.getStartDate();
            return this.dutyRepository.find().then(found=>{
                return this.findDutyAndChange(found, oldStartDate);
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

    public swapByWorkerIds(workerId1:number, workerId2:number):Promise<Duty[]>{
        console.log("DutyService: to change duties by workerId1=[" + workerId1 + "] and workerId2=[" + workerId2 + "]");
        return this.dutyRepository.findTwoByWorkerIds(workerId1, workerId2).then(found=>{
            if(typeof found[0] !== 'undefined' && typeof found[1] !== 'undefined'){
                this.swapDates(found[0], found[1]);
                this.dutyRepository.save(found[0]);
                this.dutyRepository.save(found[1]);
                return found;
            }
        });
    }

        private swapDates(duty1:Duty, duty2:Duty){
            let startDateForChange: Date = new Date(duty1.getStartDate());
            duty1.setStartDate(duty2.getStartDate());
            duty2.setStartDate(startDateForChange);

            let overDateForChange:Date = new Date(duty1.getOverDate());
            duty1.setOverDate(duty2.getOverDate());
            duty2.setOverDate(overDateForChange);
        }
}