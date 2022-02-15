import { ApiProperty } from '@nestjs/swagger';

export class ServerErrorResponse {
  @ApiProperty({
    default: 500,
  })
  code: number;
  @ApiProperty({
    default: '<Reason for Error>',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  data: [];
}
