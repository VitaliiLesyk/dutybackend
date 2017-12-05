import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, MaxLength} from "class-validator";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({message:"Field name should be not empty!"})
    @MaxLength(20,{message:"Name should have max size=[20]"})
    @Column({type:"varchar", nullable:false})
    name:string;

    @Column({type:"varchar", nullable:true})
    description:string;

    public toString():string{
        return "Task:{" +
                "id=[" + this.id + "]," +
                "name=[" + this.name + "]," +
                "description=[" + this.description + "]" +
                "}";
    }
}