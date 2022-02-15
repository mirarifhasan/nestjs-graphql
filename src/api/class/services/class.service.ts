import { ClassRepository } from './../repositories/class.repository';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Class } from '../entities/class.entity';
import { CreateClassReqDto } from '../dtos/request/create-class-req.dto';

@Injectable()
export class ClassService {
  constructor(private classRepository: ClassRepository) {}

  createClass(createClassReqDto: CreateClassReqDto) {
    return this.classRepository.save(createClassReqDto);
  }

  async getAllClass() {
    let allClass = await this.classRepository.find();
    console.log(allClass);
    return allClass;
  }

  async getClassById(id: number) {
    let aClass = await this.classRepository.findOne({ id });
    console.log(aClass);
    return aClass;
  }
}
