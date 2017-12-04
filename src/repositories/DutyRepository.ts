import {Repository} from "typeorm";
import {Duty} from "../models/Duty";
import {EntityRepository} from "typeorm/decorator/EntityRepository";

@EntityRepository(Duty)
export class DutyRepository extends Repository<Duty>{

}