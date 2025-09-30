// src/kulam/dto/create-kulam.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateKulamDto {
  @ApiProperty({
    description: 'Name of the Kulam',
    example: 'Kulam A',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the Sub-caste associated with this Kulam',
    example: 'e3e4fabc-5d56-41f8-89d9-9a6a56d79fcb',
  })
  subCasteId: string;
}

export class UpdateKulamDto {
  @ApiProperty({
    description: 'Name of the Kulam',
    example: 'Kulam B',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'ID of the Sub-caste associated with this Kulam',
    example: 'e3e4fabc-5d56-41f8-89d9-9a6a56d79fcb',
    required: false,
  })
  subCasteId?: string;
}
