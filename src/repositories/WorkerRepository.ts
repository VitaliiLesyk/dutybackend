import {Repository} from "typeorm";
import {Worker} from "../models/Worker";
import {EntityRepository} from "typeorm/decorator/EntityRepository";
import {Duty} from "../models/Duty";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker>{
    public findOneById(id:number):Promise<Worker>{
        return this.findOne({where:{id:id}});
    }

    public findOneByDuty(duty:Duty):Promise<Worker>{
        return this.createQueryBuilder('worker')
            .leftJoin('worker.duty', 'duty')
            .select()
            .where('duty.id = :id', {id: duty.getId()})
            .getOne();
    }

    public findAllOrderByDutyDate():Promise<Worker[]>{
        return this.createQueryBuilder('worker')
            .leftJoin('worker.duty', 'duty')
            .orderBy('duty.startDate')
            .getMany();
    }

    public deleteByIdAndReturn(id:number):Promise<Worker>{
        return this.findOneById(id).then(found=>{
            this.delete(id);
            return found;
        });
    }
}