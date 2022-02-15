import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AppBaseEntity } from 'src/common/database/entity/app-base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'classes',
})
@ObjectType({ description: 'classes' })
export class Class extends AppBaseEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  thumbnail: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  status: string;

  @Field((type) => Int, { nullable: false })
  @Column({
    type: 'integer',
    nullable: false,
  })
  min_age: number;

  @Field((type) => Int, { nullable: false })
  @Column({
    type: 'integer',
    nullable: false,
  })
  max_age: number;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;
}
