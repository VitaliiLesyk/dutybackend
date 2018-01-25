import {Service} from "typedi";
import {Worker} from "../models/Worker";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {DutyService} from "./DutyService";
import {IdError} from "../errors/IdError";
import {WorkerStatus} from "../enums/WorkerStatus";

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
                return added;
            });
        });
    }

    public getAllOrderedByDutyWithStatusReady():Promise<Worker[]> {
        console.log("WorkerService: to get all workers ordered by duty with status ready");
        return this.workerRepository.findAllWithStatusReadyOrderByDutyDateWithDutyStatusReady();
    }

    public getAllWithStatusFired():Promise<Worker[]>{
        console.log("WorkerService: to get all workers with status fired");
        return this.workerRepository.findAllWithStatusFired();
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
        return this.dutyService.deleteWithStatusReadyByWorkerId(id).then(deleted =>{
            return this.workerRepository.findOneById(id).then(found =>{
                if(this.workerHasPassedDuty(found)) {
                    found.setStatus(WorkerStatus.FIRED);
                    return this.workerRepository.save(found);
                }
                return this.workerRepository.deleteByIdAndReturn(id);
            });
        });
    }
    public getByCurrentDateDuty():Promise<Worker> {
        console.log("WorkerService: to get by current duties");
        return this.dutyService.getOneByCurrentDate().then(currentDuty=>{
            if(typeof currentDuty !== 'undefined')
                return this.workerRepository.findOneByDuty(currentDuty).then(found=>{
                    return found;
                });
        });
    }
    private idIsNull(id: number): boolean {
        return id === null || typeof id === 'undefined';
    }

    private workerHasPassedDuty(worker: Worker): Promise<boolean> {
        return this.dutyService.getAllByWorkerId(worker.getId()).then(found=>{
           return found.length > 1;
        });
    }
}