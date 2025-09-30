import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCasteDto {
  @ApiProperty({ example: '1a2b3c4d', description: 'The unique identifier of the caste' })
  casteId: string;

  @ApiProperty({ example: 'Sub-caste Name', description: 'The name of the sub-caste' })
  subCasteName: string;
}
