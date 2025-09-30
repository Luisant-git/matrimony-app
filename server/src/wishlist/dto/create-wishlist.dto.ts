import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ description: 'The user ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'A unique identifier for the user wishlist item' })
  @IsString()
  userWishlistId: string;
}
