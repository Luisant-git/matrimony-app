import { ApiProperty } from '@nestjs/swagger';

export class CreateKothiramDto {
  @ApiProperty({
    description: 'Name of the Kothiram',
    example: 'Kothiram A',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the associated Kulam',
    example: 1,
  })
  kulamId: string;
}
