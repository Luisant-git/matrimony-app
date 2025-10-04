import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ description: 'The user ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The profile ID to add to wishlist' })
  @IsString()
  profileId: string;
}
