import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponse {
  @ApiProperty({
    default: 201,
  })
  code: number;
  @ApiProperty({
    default: '',
  })
  message: string;
}
