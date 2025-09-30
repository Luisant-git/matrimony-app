import { ApiProperty } from '@nestjs/swagger';
import { Gender, MaritalStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateSiblingDto } from './sibilings.dto';
import { CreateJathagamDto } from './jathagam.dto';


export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  regNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()

  state: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  subCasteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  kulamId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  kothiramId : string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  birthTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  poorvigam?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  kothiram ?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  kulam ?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userProfile: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  birthPlace?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  education: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  job: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiProperty()
  @IsOptional()
  height?: number;

  @ApiProperty()
  @IsOptional()
  weight?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profile?: string;

  @ApiProperty()
  @IsOptional()
  income?: number;

  @ApiProperty({ enum: MaritalStatus })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsBoolean()
  ownHouse: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  casteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  communityId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  job_type: string;



  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSiblingDto)
  siblings?: CreateSiblingDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateJathagamDto)
  jathagam?: CreateJathagamDto;
}