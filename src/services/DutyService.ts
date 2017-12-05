import {Service} from "typedi";
import {Duty} from "../models/Duty";
import {Worker} from "../models/Worker";
import {DutyRepository} from "../repositories/DutyRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {WorkerRepository} from "../repositories/WorkerRepository";


@Service()
export class DutyService{

    private workerRepository: WorkerRepository;
    private dutyRepository: DutyRepository;

    constructor(@OrmRepository() workerRepository: WorkerRepository,
                @OrmRepository() dutyRepository:DutyRepository){
        this.workerRepository = workerRepository;
        this.dutyRepository = dutyRepository;
    }

    public createOneByWorker(worker:Worker){
        console.log("DutyService : to create one duty by " + worker);

        let dutyDate = new Date(Date.today());

        this.workerRepository.find().then(found=>{
            let workersNumber:number = found.length-1;
            dutyDate = dutyDate.addDays(workersNumber);

            this.dutyRepository.save(this.createDuty(worker, dutyDate));
        });
    }

        private createDuty(worker:Worker, date:Date):Duty{
            let duty:Duty = new Duty();
            duty.date = date.toString("d-M-yyyy");
            duty.worker = worker;
            return duty;
        }

    public getAll():Promise<Duty[]>{
        console.log("DutyService: to get all duties");
        return this.dutyRepository.find();
    }

    public getByWorkerId(workerId: number):Promise<Duty[]> {
        console.log("DutyService: to get duties by workerId=[" + workerId + "]");
        return this.dutyRepository.find({where:{workerId : workerId}});
    }

    public getByDate(date:Date): Promise<Duty>{
        console.log("DutyService: to get duty by date=[" + date.toString("d-M-yyyy") + "]");
        return this.dutyRepository.findOne({where:{date:date.toString("d-M-yyyy")}});
    }

    public getCurrentDuty():Promise<Duty>{
        console.log("DutyService: to get current duty");
        let currentDate = Date.today();
        return this.dutyRepository.findOne({where:{date:currentDate.toString("d-M-yyyy")}});
    }

    public deleteAllByWorkerId(workerId: number){
        console.log("DutyService: delete all by worker id=[" + workerId + "]");
        this.dutyRepository.deleteAllByWorkerId(workerId);
    }
}