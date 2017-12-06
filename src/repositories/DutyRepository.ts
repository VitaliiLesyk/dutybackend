import {Repository} from "typeorm";
import {Duty} from "../models/Duty";
import {EntityRepository} from "typeorm/decorator/EntityRepository";

@EntityRepository(Duty)
export class DutyRepository extends Repository<Duty>{
    public deleteByWorkerId(workerId:number):void{
        this.createQueryBuilder("duty")
            .delete()
            .from(Duty, "duty")
            .where("duty.workerId = :workerId", {workerId: workerId})
            .execute();
    }

    public findByDate(date:Date):Promise<Duty>{
        return this.createQueryBuilder("duty")
            .select()
            .where("DATE(:date) BETWEEN duty.startDate AND duty.overDate", {date: date})
            .getOne();
    }

    public findByWorkerId(workerId:number):Promise<Duty>{
        return this.findOne({where: {workerId: workerId}});
    }
}