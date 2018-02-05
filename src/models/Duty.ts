import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Worker} from "./Worker";
import {DutyStatus} from "../enums/DutyStatus";

@Entity()
export class Duty extends BaseEntity{

    @PrimaryGeneratedColumn()
    private id:number;

    @Column({'name': 'start_date', 'type':"date", 'nullable': false})
    private startDate:Date;

    @Column({'name': 'over_date', 'type':"date", 'nullable':false})
    private overDate:Date;

    @Column({'enum': DutyStatus, 'default': DutyStatus.READY})
    private status: DutyStatus;

    @ManyToOne(type => Worker, worker => worker.duties)
    @JoinColumn({'name': 'worker_id'})
    worker:Worker;

    public static readonly DUTY_DAYS_NUMBER: number = 7;

    public setId(id:number):void{
        this.id = id;
    }
    public getId():number{
        return this.id;
    }
    public setStartDate(startDate:Date):void{
        this.startDate = startDate;
    }
    public getStartDate():Date{
        return this.startDate;
    }
    public setOverDate(overDate:Date):void{
        this.overDate = overDate;
    }
    public getOverDate():Date{
        return this.overDate;
    }
    public setWorker(worker:Worker):void{
        this.worker = worker;
    }
    public getWorker():Worker{
        return this.worker;
    }
    public setStatus(status: DutyStatus):void{
        this.status = status;
    }
    public isPassed():boolean{
        return this.status === DutyStatus.PASSED;
    }
    public toString():string{
        return "Duty:{ " +
                "id=[" + this.id + "]," +
                "startDate=[" + this.startDate + "]," +
                "overDate=[" + this.overDate + "]," +
                "worker=[" + this.worker + "]" +
                "}"
    }
}