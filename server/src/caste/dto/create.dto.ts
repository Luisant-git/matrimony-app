import { ApiProperty } from '@nestjs/swagger';

export class CreateCasteDto {
  @ApiProperty({ description: 'Name of the caste' })
  casteName: string;

  @ApiProperty({ description: 'communityId' })
  communityId: string;
}
