import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, MaxLength} from "class-validator";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    private id: number;

    @IsNotEmpty({message:"Field name should be not empty!"})
    @MaxLength(20,{message:"Name should have max size=[20]"})
    @Column({type:"varchar", nullable:false})
    private name:string;

    @Column({type:"varchar", nullable:true})
    private description:string;

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

    public setDescription(description:string):void{
        this.description = description;
    }

    public getDescription():string{
        return this.description;
    }

    public toString():string{
        return "Task:{" +
                "id=[" + this.id + "]," +
                "name=[" + this.name + "]," +
                "description=[" + this.description + "]" +
                "}";
    }
}