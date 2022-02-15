import { Injectable, NotFoundException } from "@nestjs/common";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, Repository } from "typeorm";

@Injectable()
export class TypeOrmCrudRepository<T> {
  constructor(private repository: Repository<T>) {}

  async createOne(dto: DeepPartial<T>) {
    let entity = await this.repository.create(dto);
    return this.repository.save(entity);
  }

  async createMany(dtos: DeepPartial<T>[]) {
    if (dtos.length === 0) {
      return;
    }
    let entities = [];
    for (let dto of dtos) {
      let entity = await await this.repository.create(dto);
      entities.push(entity);
    }
    return this.repository.save(entities);
  }

  async findOne(findOneOptions: FindOneOptions<T>) {
    let t = await this.repository.findOne(findOneOptions);
    if (!t) {
      throw new NotFoundException(`No item with this ${JSON.stringify(findOneOptions.where)} condition found`);
    }
    return t;
  }

  async find(options?: FindManyOptions<T>);
  async find(conditions?: FindConditions<T>);
  async find(arg: FindManyOptions<T> | FindConditions<T>) {
    return this.repository.find(arg);
  }
  /* async find() {
    return this.repository.find()
  } */
  async getAll(options: IPaginationOptions) {
    let queryBuilder = this.repository.createQueryBuilder('c');
    let result = await paginate<T>(queryBuilder, options);
    return [result];
  }

  async update(findCondition: FindConditions<T>, updateDto: DeepPartial<T>) {
    return this.repository.update(findCondition, updateDto);
  }

  async delete(findCondition: FindConditions<T>) {
    return this.repository.delete(findCondition);
  }
}
