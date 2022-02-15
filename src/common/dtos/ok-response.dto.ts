import { ApiProperty } from '@nestjs/swagger';

export class OkResponse {
  @ApiProperty({
    default: 200,
  })
  code: number;
  @ApiProperty({
    default: '',
  })
  message: string;
}
