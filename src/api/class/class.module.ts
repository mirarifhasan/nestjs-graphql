import { ClassRepository } from './repositories/class.repository';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassResolver } from './resolvers/class.resolver';
import { ClassService } from './services/class.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClassRepository])],
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
