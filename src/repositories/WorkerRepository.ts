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
        return this.findOne({where: {duty: duty}});
    }

    public findAllOrderByDutyDate():Promise<Worker[]>{
        return this.createQueryBuilder('worker')
            .leftJoin('worker.duty', 'duty')
            .orderBy('duty.startDate')
            .getMany();
    }
}