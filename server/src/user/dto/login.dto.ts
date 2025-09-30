




import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User mobile number',
    example: '1234567890',
  })
  mobileNo: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  password: string;
}



