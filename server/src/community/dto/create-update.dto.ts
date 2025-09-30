import { ApiProperty } from '@nestjs/swagger';

export class CreateCommunityDto {
  @ApiProperty({ description: 'Name of the community' })
  communityName: string;
}
