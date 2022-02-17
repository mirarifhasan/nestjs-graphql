import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClassReqDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Play Group' })
  name: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Thumbnail' })
  thumbnail: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Status' })
  status: string;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 2 })
  min_age: number;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 4 })
  max_age: number;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Description' })
  description: string;
}
