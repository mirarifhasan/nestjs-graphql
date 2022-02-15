import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseModule } from 'src/common/database/database.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    DatabaseModule,
    ClassModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        playground: true,
        autoSchemaFile: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.prod.env' : '.dev.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
