import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Worker} from "./Worker";

@Entity()
export class Duty extends BaseEntity{

    @PrimaryGeneratedColumn()
    private id:number;

    @Column({type:"date", nullable: false})
    private startDate:Date;

    @Column({type:"date", nullable:false})
    private overDate:Date;

    @OneToOne(type => Worker, worker => worker.getDuty)
    @JoinColumn()
    private worker:Worker;

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
    public toString():string{
        return "Duty:{ " +
                "id=[" + this.id + "]," +
                "startDate=[" + this.startDate + "]," +
                "overDate=[" + this.overDate + "]," +
                "worker=[" + this.worker + "]" +
                "}"
    }
}