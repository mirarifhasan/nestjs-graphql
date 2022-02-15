import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    default: 404,
  })
  code: number;
  @ApiProperty({
    default: '',
  })
  message: string;
  @ApiProperty({
    default: [],
  })
  data: [];
}
