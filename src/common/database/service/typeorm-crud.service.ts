import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class TypeOrmCrudService<T> {
 
  constructor(private aRepository: Repository<T>) {
  }

  async createOne(dto: DeepPartial<T>) {
    let entity = await this.aRepository.create(dto);
    return this.aRepository.save(entity);
  }

  async createMany(dtos: DeepPartial<T>[]) {
    if (dtos.length === 0) {
      return;
    }
    let entities = [];
    for (let dto of dtos) {
      let entity = await await this.aRepository.create(dto);
      entities.push(entity);
    }
    return this.aRepository.save(entities);
  }

  async findOne(findOneOptions: FindOneOptions<T>) {
    let t = await this.aRepository.findOne(findOneOptions);
    if (!t) {
      throw new NotFoundException(`No item with this ${JSON.stringify(findOneOptions.where)} condition found`);
    }
    return t;
  }

  async find(options?: FindManyOptions<T>):Promise<T[]>;
  async find(conditions?: FindConditions<T>):Promise<T[]>;
  async find(arg: FindManyOptions<T> | FindConditions<T>):Promise<T[]> {
    return this.aRepository.find(arg);
  }
  /* async find() {
    return this.repository.find()
  } */
  async getAll(options: IPaginationOptions) {
    let queryBuilder = this.aRepository.createQueryBuilder('c');
    let result = await paginate<T>(queryBuilder, options);
    return [result];
  }

  async update(findCondition: FindConditions<T>, updateDto: DeepPartial<T>) {
    return this.aRepository.update(findCondition, updateDto);
  }

  async delete(findCondition: FindConditions<T>) {
    return this.aRepository.delete(findCondition);
  }
}
