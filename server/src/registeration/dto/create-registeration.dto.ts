// src/registeration/dto/create-registeration.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateRegisterationDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+1234567890' })
  @IsPhoneNumber()
  number: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Job Seeker' })
  @IsString()
  looking_For: string;

  @ApiProperty({ example: 'Personal Profile' })
  @IsString()
  this_profile_for: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  otp: string;

}
