import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Gender } from '@prisma/client'; // Import the Gender enum from Prisma

export class CreateSiblingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender; // Use Prisma's Gender enum
}
