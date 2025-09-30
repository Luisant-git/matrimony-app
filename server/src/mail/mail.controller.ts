// mail.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail') // Ensure the controller path is correct
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send-email') // This defines the route
  async sendEmail(
    @Query('to') to: string,
    @Query('username') username: string,
    @Query('code') code: string,
  ) {
    await this.mailService.sendUserConfirmation(to, username, code);
    return 'Email sent!';
  }
}
