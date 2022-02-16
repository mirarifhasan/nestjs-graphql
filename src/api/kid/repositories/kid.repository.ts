import { EntityRepository, Repository } from 'typeorm';
import { Kid } from '../entities/kid.entity';

@EntityRepository(Kid)
export class KidRepository extends Repository<Kid> {
  getKidById(id: number) {
    let queryBuilder = this.createQueryBuilder('kids');
    return queryBuilder.where('kids.id=:id', { id: id }).getRawOne();
  }
}
