import { Injectable } from '@nestjs/common';
import { KidRepository } from '../repositories/kid.repository';

@Injectable()
export class KidService {
  constructor(private kidRepository: KidRepository) {}

  async getKidById(id: number) {
    let kid = await this.kidRepository.findOne({ where: { id } });
    console.log(kid);

    return kid;
  }
}
