import {Service} from "typedi";
import {Duty} from "../models/Duty";
import {Worker} from "../models/Worker";
import {DutyRepository} from "../repositories/DutyRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {DutyStatus} from "../enums/DutyStatus";


@Service()
export class DutyService {

    private workerRepository: WorkerRepository;
    private dutyRepository: DutyRepository;

    constructor(@OrmRepository() workerRepository: WorkerRepository,
                @OrmRepository() dutyRepository: DutyRepository) {
        this.workerRepository = workerRepository;
        this.dutyRepository = dutyRepository;
    }

    public createOneByWorker(worker: Worker, justSaved:boolean):Promise<Duty>{
        console.log("DutyService to create one duties by " + worker);
        return this.workerRepository.findAllWithStatusReadyAndCount().then(count => {
            if(justSaved)
                count--;
            let startDate:Date = this.createStartDate(count);
            let overDate = this.createOverDate(startDate);
            return this.dutyRepository.findOneWithStatusReadyByWorkerId(worker.getId()).then(found=>{
                if(typeof found !== 'undefined')
                    this.changeStatusToPassedAndSave(found);
                let created = this.createNewDuty(worker, startDate, overDate);
                return this.dutyRepository.save(created);
            });
        });
    }

        private createStartDate(weeksToAdd: number):Date{
            let today:Date = Date.today();
            let dayOfWeek:number = today.getDay();
            return today.addDays(1-dayOfWeek).addWeeks(weeksToAdd);
        }

        private createOverDate(startDate: Date):Date{
            let overDate = new Date(startDate);
            overDate = overDate.addDays(Duty.DUTY_DAYS_NUMBER - 1);
            return overDate;
        }

        private createNewDuty(worker: Worker, startDate: Date, overDate:Date): Duty {
            let duty:Duty = new Duty();
            duty.setStartDate(startDate);
            duty.setOverDate(overDate);
            duty.setWorker(worker);
            duty.setStatus(DutyStatus.READY);
            return duty;
        }

        private changeStatusToPassedAndSave(duty:Duty) {
            duty.setStatus(DutyStatus.PASSED);
            this.dutyRepository.save(duty);
        }

    public getAll():Promise<Duty[]> {
        console.log("DutyService: to get all duties");
        return this.dutyRepository.find();
    }

    public getAllByWorkerId(workerId: number):Promise<Duty[]> {
        console.log("DutyService: to get all duties by workerId=[" + workerId + "]");
        return this.dutyRepository.findAllByWorkerId(workerId);
    }

    public getPassedByWorkerId(workerId: number):Promise<Duty[]>{
        console.log("DutyService: to get passed duty by workerId=[" + workerId + "]");
        return this.dutyRepository.findPassedByWorkerId(workerId);
    }

    public getReadyByWorkerId(workerId: number):Promise<Duty>{
        console.log("DutyService: to get duty with status ready by workerId=[" + workerId + "]");
        return this.dutyRepository.findOneWithStatusReadyByWorkerId(workerId);
    }

    public getByDate(date: Date):Promise<Duty> {
        console.log("DutyService: to get duties by date=[" + date.toString("yyyy-MM-dd") + "]");
        return this.dutyRepository.findByDate(date);
    }

    public getOneByCurrentDate():Promise<Duty> {
        console.log("DutyService: to get current duties");
        return this.dutyRepository.findByDate(Date.today());
    }

    public deleteByWorkerId(workerId: number):Promise<Duty>{
        console.log("DutyService: delete by worker id=[" + workerId + "]");
        return this.dutyRepository.deleteWithStatusReadyByWorkerIdAndReturn(workerId).then(deleted =>{
            let deletedStartDate = deleted.getStartDate();
            return this.dutyRepository.findAllWithStatusReadyAfterDate(deletedStartDate).then(found=> {
                this.changeDuties(found);
                return deleted;
            });
        });
    }

        private changeDuties(duties:Duty[]):void{
            for(let i:number = 0;i<duties.length;i++){
                this.dutyRepository.save(this.subtractDaysConstantFromDutyDates(duties[i]));
            }
        }

        private subtractDaysConstantFromDutyDates(duty: Duty):Duty{
            let newStartDate:Date = new Date(duty.getStartDate());
            newStartDate.addDays(-Duty.DUTY_DAYS_NUMBER);
            duty.setStartDate(newStartDate);

            let newOverDate:Date = new Date(duty.getOverDate());
            newOverDate.addDays(-Duty.DUTY_DAYS_NUMBER);
            duty.setOverDate(newOverDate);

            return duty;
        }

    public swapWithStatusReadyByWorkerIds(workerId1:number, workerId2:number):Promise<Duty[]>{
        console.log("DutyService: to change duties by workerId1=[" + workerId1 + "] and workerId2=[" + workerId2 + "]");
        return this.dutyRepository.findTwoWithStatusReadyByWorkersIds(workerId1, workerId2).then(found=>{
            if(typeof found[0] !== 'undefined' && typeof found[1] !== 'undefined'){
                this.swapDutiesDates(found[0], found[1]);
                this.dutyRepository.save(found[0]);
                this.dutyRepository.save(found[1]);
                return found;
            }
        });
    }

        private swapDutiesDates(duty1:Duty, duty2:Duty){
            let startDateForChange: Date = new Date(duty1.getStartDate());
            duty1.setStartDate(duty2.getStartDate());
            duty2.setStartDate(startDateForChange);

            let overDateForChange:Date = new Date(duty1.getOverDate());
            duty1.setOverDate(duty2.getOverDate());
            duty2.setOverDate(overDateForChange);
        }
}