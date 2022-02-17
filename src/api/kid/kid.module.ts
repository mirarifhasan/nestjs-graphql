import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KidRepository } from './repositories/kid.repository';
import { KidResolver } from './resolvers/kid.resolver';
import { KidService } from './services/kid.service';

@Module({
  imports: [TypeOrmModule.forFeature([KidRepository])],
  providers: [KidResolver, KidService],
})
export class KidModule {}
