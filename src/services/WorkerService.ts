import {Service} from "typedi";
import {Worker} from "../models/Worker";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {DutyService} from "./DutyService";
import {Duty} from "../models/Duty";
import {IdError} from "../errors/IdError";

@Service()
export class WorkerService {
    private workerRepository: WorkerRepository;
    private dutyService: DutyService;

    constructor(@OrmRepository() workerRepository: WorkerRepository,
                @Service() dutyService:DutyService) {
        this.workerRepository = workerRepository;
        this.dutyService = dutyService;
    }

    public add(worker: Worker):Promise<Worker> {
        console.log("WorkerService: to add one worker");

        if(!this.idIsNull(worker.id))
            throw new IdError("Id field should be empty");

        return this.workerRepository.save(worker).then(added=> {
            this.dutyService.createOneByWorker(added);
            return added;
        });
    }

        private idIsNull(id:number):boolean{
            return id === null || typeof id === 'undefined';
        }

    public getAll():Promise<Worker[]> {
        console.log("WorkerService: to get all workers");
        return this.workerRepository.find();
    }

    public getOne(id: number):Promise<Worker> {
        console.log("WorkerService: to get one worker by id=[" + id + "]");
        return this.workerRepository.findOne({where:{id:id}});
    }

    public update(worker: Worker):Promise<Worker>{
        console.log("WorkerService: to update worker " + worker);

        if(this.idIsNull(worker.id))
            throw new IdError("Id field should not be empty");

        return this.workerRepository.findOne({where:{id:worker.id}}).then(found=>{
            if(typeof found !== 'undefined'){
                return this.workerRepository.save(worker);
            }
        });
    }

    public deleteById(id: number):Promise<Worker>{
        console.log("WorkerService: to delete worker by id=[" + id + "]");
        return this.workerRepository.findOne({where:{id:id}}).then((found)=>{
            this.dutyService.deleteAllByWorkerId(id);
            this.workerRepository.delete(id);
            return found;
        });
    }

    public getByCurrentDuty():Promise<Worker> {
        console.log("WorkerService: to get by current duty");
        let currentDuty: Promise<Duty> = this.dutyService.getCurrentDuty();
        return this.workerRepository.findOne({where: {duty: currentDuty}});
    }
}