import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StatusEnum} from "../enums/StatusEnum";
import {IsEmail, IsEmpty, IsEnum, IsNotEmpty, Length, MaxLength} from "class-validator";
import {Duty} from "./Duty";

@Entity()
export class Worker extends BaseEntity{

    @IsEmpty({message:"Id field should be empty"})
    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty({message:"Name field should be not empty"})
    @MaxLength(20,{message:"Name field should have max size=[20]"})
    @Column({type:"varchar", nullable:false})
    name:string;

    @IsEmail()
    @Column({type:"varchar", nullable:false, unique:true})
    email:string;

    @IsNotEmpty({message:"Password field should be not empty"})
    @Length(8, 20, {message:"Password field should have size=[8-20]"})
    @Column({type:"varchar", nullable:false})
    password:string;

    @IsEnum(StatusEnum)
    @Column({default: StatusEnum.READY})
    status:string;

    @OneToMany(type => Duty, duty => duty.worker)
    duties:Duty[];

    public toString():string{
        return "Worker:{" +
                "id=[" + this.id + "]," +
                "name=[" + this.name + "]," +
                "email=[" + this.email + "]," +
                "password=[" + this.password + "]," +
                "status=[" + this.status + "]," +
                "}"
    }
}