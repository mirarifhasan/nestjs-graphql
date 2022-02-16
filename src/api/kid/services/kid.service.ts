import { Injectable } from '@nestjs/common';
import { KidRepository } from '../repositories/kid.repository';

@Injectable()
export class KidService {
  constructor(private kidRepository: KidRepository) {}

  getKidById(id: number) {
    return this.kidRepository.findOne({ where: { id } });
  }
}
