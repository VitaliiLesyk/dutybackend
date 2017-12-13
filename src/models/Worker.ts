import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {IsEmail,IsNotEmpty, Length, MaxLength} from "class-validator";
import {Duty} from "./Duty";
import {WorkerStatus} from "../enums/WorkerStatus";

@Entity()
export class Worker extends BaseEntity{
    @PrimaryGeneratedColumn()
    private id:number;

    @IsNotEmpty({message:"Name field should be not empty"})
    @MaxLength(20,{message:"Name field should have max size=[20]"})
    @Column({type:"varchar", nullable:false})
    private name:string;

    @IsEmail()
    @Column({type:"varchar", nullable:false, unique:true})
    private email:string;

    @IsNotEmpty({message:"Password field should be not empty"})
    @Length(8, 20, {message:"Password field should have size=[8-20]"})
    @Column({type:"varchar", nullable:false})
    private password:string;

    @Column({type:"enum", enum: WorkerStatus, default: WorkerStatus.READY})
    private status:WorkerStatus;

    @OneToMany(type => Duty, duty => duty.worker)
    duties:Duty;

    public setId(id:number):void{
        this.id = id;
    }
    public getId():number{
        return this.id;
    }
    public setName(name:string):void{
        this.name = name;
    }
    public getName():string{
        return this.name;
    }
    public setEmail(email:string):void{
        this.email = email;
    }
    public getEmail():string{
        return this.email;
    }
    public setPassword(password:string):void{
        this.password = password;
    }
    public getPassword():string{
        return this.password;
    }
    public setDuty(duty:Duty):void{
        this.duties = duty;
    }
    public getDuty():Duty{
        return this.duties;
    }
    public setStatus(status:WorkerStatus):void{
        this.status = status;
    }
    public getStatus():WorkerStatus{
        return this.status;
    }
    public toString():string{
        return "Worker:{" +
                "id=[" + this.id + "]," +
                "name=[" + this.name + "]," +
                "email=[" + this.email + "]," +
                "password=[" + this.password + "]" +
                "}"
    }
}