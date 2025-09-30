import { Module } from '@nestjs/common';
import { RegisterationService } from './registeration.service';
import { RegisterationController } from './registeration.controller';
import { TwilioService } from 'src/twilio/twilio.service';
import { RegistrationGateway } from './registration.gateway';

@Module({
  providers: [RegisterationService,TwilioService,RegistrationGateway],
  controllers: [RegisterationController]
})
export class RegisterationModule {}
