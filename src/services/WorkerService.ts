import {Service} from "typedi";
import {Worker} from "../models/Worker";
import {WorkerRepository} from "../repositories/WorkerRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {DutyService} from "./DutyService";

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
        return this.workerRepository.save(worker).then(added=> {
            this.dutyService.createOneByWorker(added);
            return added;
        });
    }

    public getAll():Promise<Worker[]> {
        console.log("WorkerService: to get all workers");
        return this.workerRepository.find();
    }

    public getOne(id: number):Promise<Worker> {
        console.log("WorkerService: to get one worker by id=[" + id + "]");
        return this.workerRepository.findOne({where:{id:id}});
    }

    public update(id: number, worker: Worker):Promise<Worker>{
        console.log("WorkerService: to update worker by id=[" + id + "]");
        return this.workerRepository.findOne({where:{id:id}}).then(found=>{
            if(typeof found !== 'undefined'){
                worker.id = id;
                return this.workerRepository.save(worker);
            }
        });
    }

    public deleteById(id: number):Promise<Worker>{
        console.log("WorkerService: to delete worker by id=[" + id + "]");
        return this.workerRepository.findOne({where:{id:id}}).then((found)=>{
            this.workerRepository.delete(id);
            return found;
        });
    }


}