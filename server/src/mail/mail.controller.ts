// mail.controller.ts
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async sendContactForm(@Body() contactData: { name: string; email: string; subject: string; message: string }) {
    await this.mailService.sendContactForm(contactData.name, contactData.email, contactData.subject, contactData.message);
    return { success: true, message: 'Message sent successfully!' };
  }

  @Get('send-email')
  async sendEmail(
    @Query('to') to: string,
    @Query('username') username: string,
    @Query('code') code: string,
  ) {
    await this.mailService.sendUserConfirmation(to, username, code);
    return 'Email sent!';
  }
}
