import {Service} from "typedi";
import {Worker} from "../models/Worker";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {DutyService} from "./DutyService";
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

        if(!this.idIsNull(worker.getId()))
            throw new IdError("Id field should be empty");

        return this.workerRepository.save(worker).then(added=> {
            this.dutyService.createOneByWorker(added);
            return added;
        });
    }

    public getAll():Promise<Worker[]> {
        console.log("WorkerService: to get all workers");
        return this.workerRepository.findAllOrderByDutyDate();
    }

    public getOne(id: number):Promise<Worker> {
        console.log("WorkerService: to get one worker by id=[" + id + "]");
        return this.workerRepository.findOneById(id);
    }

    public update(worker: Worker):Promise<Worker>{
        console.log("WorkerService: to update worker " + worker);

        if(this.idIsNull(worker.getId()))
            throw new IdError("Id field should not be empty");

        return this.workerRepository.findOneById(worker.getId()).then(found=>{
            if(typeof found !== 'undefined'){
                return this.workerRepository.save(worker);
            }
        });
    }

    public deleteById(id: number):Promise<Worker>{
        console.log("WorkerService: to delete worker by id=[" + id + "]");
        return this.workerRepository.findOneById(id).then((found)=>{
            this.dutyService.deleteByWorkerId(id).then(()=>{
                this.workerRepository.delete(id);
            });
            return found;
        });
    }

    public getByCurrentDuty():Promise<Worker> {
        console.log("WorkerService: to get by current duty");
        return this.dutyService.getCurrentDuty().then(currentDuty=>{
            return this.workerRepository.findOneByDuty(currentDuty);
        });
    }

    private idIsNull(id: number): boolean {
        return id === null || typeof id === 'undefined';
    }
}