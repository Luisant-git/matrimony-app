import { Injectable, OnModuleInit } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService implements OnModuleInit {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async onModuleInit() {
    // this.sendSms('+917094881974', 'Otp-1234');
  }

  async sendSms(to: string, body: string) {
    await this.client.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
  }

 
}
