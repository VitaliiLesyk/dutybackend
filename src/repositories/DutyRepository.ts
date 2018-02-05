import {Repository} from "typeorm";
import {Duty} from "../models/Duty";
import {EntityRepository} from "typeorm/decorator/EntityRepository";
import {DutyStatus} from "../enums/DutyStatus";

@EntityRepository(Duty)
export class DutyRepository extends Repository<Duty>{

    public deleteWithStatusReadyByWorkerIdAndReturn(workerId:number):Promise<Duty>{
        console.log("DutyRepository to delete duties by workerId=[" + workerId + "] and return deleted");
        return this.findOneWithStatusReadyByWorkerId(workerId).then(found=> {
            this.createQueryBuilder("duty")
                .delete()
                .from(Duty, "duty")
                .where("duty.workerId = :workerId", {workerId: workerId})
                .andWhere("duty.status = :status", {status: DutyStatus.READY})
                .execute();
            return found;
        });
    }
    public findByDate(date:Date):Promise<Duty>{
        console.log("DutyRepository to find by date=[" + date + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("DATE(:date) BETWEEN duty.startDate AND duty.overDate", {date: date})
            .getOne();
    }

    public findWithStatusReadyByDate(date:Date):Promise<Duty>{
        console.log("DutyRepository to find ready by date=[" + date + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("DATE(:date) BETWEEN duty.startDate AND duty.overDate", {date: date})
            .andWhere("duty.status = :status", {status: DutyStatus.READY})
            .getOne();
    }

    public findOneWithStatusReadyByWorkerId(workerId:number):Promise<Duty>{
        console.log("DutyRepository to find one with status ready by worker id=[" + workerId + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("duty.status = :status", {status: DutyStatus.READY})
            .andWhere("duty.workerId = :workerId", {workerId: workerId})
            .getOne();
    }
    public findAllByWorkerId(workerId:number):Promise<Duty[]>{
        console.log("DutyRepository to find all by worker id=[" + workerId + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("duty.workerId = :workerId", {workerId: workerId})
            .getMany();
    }
    public findPassedByWorkerId(workerId:number):Promise<Duty[]>{
        console.log("DutyRepository to find passed by worker id=[" + workerId + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("duty.workerId = :workerId", {workerId: workerId})
            .andWhere("duty.status = :status", {status: DutyStatus.PASSED})
            .getMany();
    }
    public findTwoWithStatusReadyByWorkersIds(workerId1:number, workerId2:number):Promise<Duty[]>{
        console.log("DutyRepository to find two with status ready by workers ids: id1=[" + workerId1 + "], id2=[" + workerId2 + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("duty.workerId = :workerId1 AND duty.status = :status", {workerId1: workerId1, status:DutyStatus.READY})
            .orWhere("duty.workerId = :workerId2 AND duty.status = :status", {workerId2: workerId2, status: DutyStatus.READY})
            .getMany();
    }
    public findAllWithStatusReadyAfterDate(date:Date): Promise<Duty[]>{
        console.log("DutyRepository to find all with status ready after date=[" + date.toString("dd-MM-yyyy") + "]");
        return this.createQueryBuilder("duty")
            .select()
            .where("duty.startDate > DATE(:date)", {date:date})
            .andWhere("duty.status = :status", {status: DutyStatus.READY})
            .getMany();
    }
}