import {Repository} from "typeorm";
import {Worker} from "../models/Worker";
import {EntityRepository} from "typeorm/decorator/EntityRepository";
import {Duty} from "../models/Duty";
import {WorkerStatus} from "../enums/WorkerStatus";
import {DutyStatus} from "../enums/DutyStatus";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker>{
    public findOneById(id:number):Promise<Worker>{
        return this.findOne({where:{id:id}});
    }
    public findOneByDuty(duty:Duty):Promise<Worker>{
        return this.createQueryBuilder('worker')
            .leftJoin('worker.duties', 'duties')
            .select()
            .where('duties.id = :id', {id: duty.getId()})
            .getOne();
    }
    public findAllWithStatusReadyOrderByDutyDateWithDutyStatusReady():Promise<Worker[]>{
        return this.createQueryBuilder('worker')
            .leftJoin('worker.duties', 'duties')
            .orderBy('duties.startDate')
            .where("duties.status = :status", {status: DutyStatus.READY})
            .andWhere("worker.status = :status", {status: WorkerStatus.READY})
            .getMany();
    }
    public findAllWithStatusFired():Promise<Worker[]>{
        return this.createQueryBuilder('worker')
            .select()
            .where('worker.status = :status', {status: WorkerStatus.FIRED})
            .getMany();
    }
    public findAllWithStatusReadyAndCount():Promise<number>{
        return this.createQueryBuilder('worker')
            .select()
            .where("worker.status = :status", {status: WorkerStatus.READY})
            .getCount();
    }
    public deleteByIdAndReturn(id:number):Promise<Worker>{
        return this.findOneById(id).then(found=>{
            return this.delete(id).then(()=>{
                return found;
            });
        })
    }
    public findOneByEmail(email:string):Promise<Worker>{
        return this.createQueryBuilder('worker')
            .select()
            .where('worker.email = :email', {email: email})
            .getOne();
    }
}