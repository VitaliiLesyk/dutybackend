import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail,IsNotEmpty, Length, MaxLength} from "class-validator";
import {Duty} from "./Duty";

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

    @OneToOne(type => Duty, duty => duty.worker)
    duty:Duty;

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
        this.duty = duty;
    }

    public getDuty():Duty{
        return this.duty;
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