import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateJathagamDto {
  @IsNotEmpty()
  @IsString()
  rasi: string;

  @IsNotEmpty()
  @IsString()
  uploadJathakam: string;

  @IsNotEmpty()
  @IsString()
  natchathiram: string;

  @IsNotEmpty()
  @IsString()
  lagnam: string;

  @IsNotEmpty()
  @IsBoolean()
  dosham: boolean;
}
