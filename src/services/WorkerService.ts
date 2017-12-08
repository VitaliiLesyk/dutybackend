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
            return this.dutyService.createOneByWorker(added, true).then(created=>{
                created.setWorker(null);
                added.setDuty(created);
                return added;
            });
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
        return this.dutyService.deleteByWorkerId(id).then((deletedDuty)=>{
            return this.workerRepository.deleteByIdAndReturn(id).then(deleted=>{
                deletedDuty.setWorker(null);
                deleted.setDuty(deletedDuty);
                return deleted;
            });
        });
    }

    public getByCurrentDuty():Promise<Worker> {
        console.log("WorkerService: to get by current duty");
        return this.dutyService.getCurrentDuty().then(currentDuty=>{
            return this.workerRepository.findOneByDuty(currentDuty).then(found=>{
                currentDuty.setWorker(null);
                found.setDuty(currentDuty);
                return found;
            });
        });
    }

    private idIsNull(id: number): boolean {
        return id === null || typeof id === 'undefined';
    }
}