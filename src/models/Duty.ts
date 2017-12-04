import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Worker} from "./Worker";

@Entity()
export class Duty extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", nullable:false})
    date:string;

    @ManyToOne(type => Worker, worker => worker.duties)
    @JoinColumn()
    worker:Worker;


    public toString():string{
        return "Duty:{ " +
                "id=[" + this.id + "]," +
                "date=[" + this.date + "]," +
                "worker=[" + this.worker + "]" +
                "}"
    }
}