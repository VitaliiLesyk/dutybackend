import {Repository} from "typeorm";
import {Duty} from "../models/Duty";
import {EntityRepository} from "typeorm/decorator/EntityRepository";

@EntityRepository(Duty)
export class DutyRepository extends Repository<Duty>{
    public deleteAllByWorkerId(workerId:number){
        this.createQueryBuilder("duty")
            .delete()
            .from(Duty, "duty")
            .where("duty.workerId = :workerId", {workerId: workerId})
            .execute();
    }
}