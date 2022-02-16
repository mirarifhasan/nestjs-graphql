import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Class } from 'src/api/class/entities/class.entity';
import { AppBaseEntity } from 'src/common/database/entity/app-base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'kids',
})
@ObjectType({ description: 'kids' })
export class Kid extends AppBaseEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Field()
  @Column({
    type: 'integer',
    nullable: false,
  })
  age: number;

  @Field({ nullable: true })
  @Column({
    type: 'date',
    nullable: true,
  })
  birth_date: Date;

  @Field({ nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  avater: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  relation: string;

  // @Field(() => JSON, { nullable: true })
  // @Column({
  //   type: 'json',
  //   nullable: true,
  // })
  // settings: Object;

  @Field(type => Class)
  @ManyToOne(() => Class, (aClass: Class) => aClass.kids, {})
  @JoinColumn({ name: 'class_id' })
  class: Class;
}
