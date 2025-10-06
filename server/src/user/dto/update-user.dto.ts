import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Gender, MaritalStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { CreateSiblingDto } from './sibilings.dto';
import { CreateJathagamDto } from './jathagam.dto';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  regNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mobileNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  userProfile?: string[];

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ enum: MaritalStatus })
  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus?: MaritalStatus;

  @IsOptional()
  @Type(() => CreateSiblingDto)
  siblings?: CreateSiblingDto[];

  @IsOptional()
  @Type(() => CreateJathagamDto)
  jathagam?: CreateJathagamDto[];
}
