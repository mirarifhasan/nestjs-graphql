import { ApiProperty } from '@nestjs/swagger';

export class NotAcceptableResponse {
  @ApiProperty({
    default: 406,
  })
  code: number;
  @ApiProperty({
    default: '<Reason>',
  })
  message: string;
  @ApiProperty({
    default: [],
  })
  data: [];
}
