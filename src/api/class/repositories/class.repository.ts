import { EntityRepository, Repository } from "typeorm";
import { Class } from "../entities/class.entity";

@EntityRepository(Class)
export class ClassRepository extends Repository<Class> {}

