// src/registeration/registeration.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegisterationDto } from './dto/create-registeration.dto';
import * as crypto from 'crypto';
import { TwilioService } from 'src/twilio/twilio.service';
import { RegistrationGateway } from './registration.gateway';

@Injectable()
export class RegisterationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: RegistrationGateway,
    private readonly twilioService: TwilioService, // Assuming you have TwilioService setup
  ) {}

  // async registerUser(createRegisterationDto: CreateRegisterationDto) {
  //   // Step 1: Verify if the phone number exists and is already verified
  //   const existingUser = await this.prisma.registeration.findFirst({
  //     where: { number: createRegisterationDto.number },
  //   });

  //   if (existingUser && existingUser.isVerified) {
  //     throw new Error('Phone number already verified and registered');
  //   }

  //   // Step 2: If not verified or new phone number, send OTP
  //   const otp = this.generateOtp();
  //   await this.sendOtp(createRegisterationDto.number, otp);

  //   // Step 3: Save the registration data temporarily for OTP verification
  //   const registration = await this.prisma.registeration.create({
  //     data: {
  //       ...createRegisterationDto,
  //       otp, // Save the generated OTP for verification
  //       isVerified: false, // Initially mark as unverified
  //     },
  //   });

  //   return { message: 'OTP sent to phone number', registrationId: registration.id };
  // }

  private generateOtp(): string {
    // Generate a 6-digit OTP
    return crypto.randomInt(100000, 999999).toString();
  }

  private async sendOtp(number: string, otp: string) {
    // Use Twilio or any other service to send SMS
    console.log(`Sending OTP: ${otp} to ${number}`);
    await this.twilioService.sendSms(number, `Your OTP is: ${otp}`);
  }

  // async verifyOtp(registrationId: string, otp: string) {
  //   // Step 1: Find the registration entry
  //   const registration = await this.prisma.registeration.findUnique({
  //     where: { id: registrationId },
  //   });

  //   if (!registration) {
  //     throw new Error('Registration not found');
  //   }

  //   // Step 2: Check if the OTP matches
  //   if (registration.otp !== otp) {
  //     throw new Error('Invalid OTP');
  //   }

  //   // Step 3: OTP is valid, mark the user as verified
  //   await this.prisma.registeration.update({
  //     where: { id: registrationId },
  //     data: {
  //       isVerified: true, // Mark the number as verified
  //       otp: null, // Remove OTP after successful verification
  //     },
  //   });

  //   // Step 4: Proceed with registration or further actions after verification
  //   return { message: 'OTP verified successfully, you can now complete registration' };
  // }


//   async create(createRegistrationDto: CreateRegisterationDto) {
//     return this.prisma.registeration.create({
//       data: {
//         name: createRegistrationDto.name,
//         number: createRegistrationDto.number,
//         email: createRegistrationDto.email,
//         looking_For: createRegistrationDto.looking_For,
//         this_profile_for: createRegistrationDto.this_profile_for,
//         otp: createRegistrationDto.otp,

//       },
//     });
//   }

// async get(){
// return  await this.prisma.registeration.findMany()
// }


async create(createRegistrationDto: CreateRegisterationDto) {
  const registration = await this.prisma.registeration.create({
    data: {
      name: createRegistrationDto.name,
      number: createRegistrationDto.number,
      email: createRegistrationDto.email,
      looking_For: createRegistrationDto.looking_For,
      this_profile_for: createRegistrationDto.this_profile_for,
      otp: createRegistrationDto.otp,
    },
  });

  const updatedList = await this.get(); // Fetch updated list
  this.gateway.broadcastRegistrations(updatedList); // Broadcast the updated list
  return registration;
}

async get() {
  return this.prisma.registeration.findMany();
}

}
