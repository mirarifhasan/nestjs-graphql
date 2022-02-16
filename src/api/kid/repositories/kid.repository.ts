import { EntityRepository, Repository } from 'typeorm';
import { Kid } from '../entities/kid.entity';

@EntityRepository(Kid)
export class KidRepository extends Repository<Kid> {
  getKidsByParentId(parent_id: number) {
    let queryBuilder = this.createQueryBuilder('kids');
    return queryBuilder
      .where('kids.parent_id=:parent_id', { parent_id: parent_id })
      .leftJoinAndSelect('kids.class', 'class')
      .select(['kids', 'class.id', 'class.name'])
      .getMany();
  }
}
