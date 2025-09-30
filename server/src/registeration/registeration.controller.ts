import { Controller, Post, Body, Param, Query, Get } from '@nestjs/common';
import { RegisterationService } from './registeration.service';
import { CreateRegisterationDto } from './dto/create-registeration.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('registration')
export class RegisterationController {
  constructor(private readonly registerationService: RegisterationService) {}

  @ApiOperation({ summary: 'Register a new user and send OTP to phone number' })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Phone number already verified or registration failed',
  })
  // @Post('register')
  // async registerUser(@Body() createRegisterationDto: CreateRegisterationDto) {
  //   return await this.registerationService.registerUser(createRegisterationDto);
  // }

  // @ApiOperation({ summary: 'Verify the OTP for phone number registration' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'OTP verified successfully',
  //   type: Object,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Invalid OTP or registration not found',
  // })
  // @ApiParam({
  //   name: 'registrationId',
  //   description: 'Registration ID to verify OTP for',
  //   type: String,
  // })
  // @Post('verifyOtp/:registrationId')
  // async verifyOtp(
  //   @Param('registrationId') registrationId: string,
  //   @Query('otp') otp: string,
  // ) {
  //   return await this.registerationService.verifyOtp(registrationId, otp);
  // }

  @Post()
  @ApiOperation({ summary: 'Create a new registration' })  // Description of what the endpoint does
  @ApiResponse({
    status: 201,
    description: 'The registration has been successfully created.',
    
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createRegistrationDto: CreateRegisterationDto): Promise<CreateRegisterationDto> {
    return this.registerationService.create(createRegistrationDto);
  }

  @Get()
  async get() {
  return  await this.registerationService.get()
  }
}
