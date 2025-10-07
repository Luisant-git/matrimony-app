import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendContactForm(name: string, email: string, subject: string, message: string) {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FFFFFF; margin: 0; padding: 0; }
            .email-container { width: 100%; max-width: 650px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
            .header { text-align: center; padding: 50px 30px; background: linear-gradient(135deg, #F2526E 0%, #FF6B8A 50%, #F2526E 100%); color: #FFFFFF; position: relative; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat; }
            .header img { width: 140px; margin-bottom: 20px; filter: brightness(0) invert(1); position: relative; z-index: 1; }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; position: relative; z-index: 1; }
            .content { padding: 50px 40px; }
            .intro { text-align: center; margin-bottom: 40px; }
            .intro h2 { color: #333; font-size: 24px; font-weight: 600; margin-bottom: 10px; }
            .intro p { color: #666; font-size: 16px; }
            .field-container { background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e9ecef; }
            .field { margin-bottom: 25px; padding: 20px; background-color: #FFFFFF; border-radius: 8px; border-left: 4px solid #F2526E; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            .field:last-child { margin-bottom: 0; }
            .label { font-weight: 700; color: #F2526E; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .value { color: #333; font-size: 16px; line-height: 1.5; word-wrap: break-word; }
            .footer { background-color: #333; color: #FFFFFF; text-align: center; padding: 30px 20px; }
            .footer p { margin: 5px 0; font-size: 14px; opacity: 0.8; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="http://195.35.22.221:4052/logo.png" alt="Matrimony Logo" />
              <h1>New Contact Inquiry</h1>
              <p>Someone wants to connect with you</p>
            </div>
            <div class="content">
              <div class="intro">
                <h2>Contact Details</h2>
                <p>You have received a new message through your contact form</p>
              </div>
              <div class="field-container">
                <div class="field">
                  <div class="label">Full Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${message}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>&copy; 2024 Matrimony. All rights reserved.</p>
              <p>Connecting hearts, creating families</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.mailerService.sendMail({
      to: process.env.GMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: htmlContent,
      replyTo: email,
    });
  }

  async sendUserConfirmation(to: string, username: string, code: string) {
    // Define the email content with inline HTML
    const htmlContent = `
 <html>
  <head>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FFFFFF; margin: 0; padding: 0; }
      .email-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
      .header { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #F2526E 0%, #FF6B8A 100%); color: #FFFFFF; }
      .header img { width: 120px; margin-bottom: 15px; }
      .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
      .content { padding: 40px 30px; text-align: center; }
      .welcome-text { font-size: 24px; color: #333; font-weight: 600; margin-bottom: 10px; }
      .password-box { background-color: #F2526E; color: #FFFFFF; padding: 20px; border-radius: 8px; margin: 25px 0; font-size: 20px; font-weight: bold; }
      .description { font-size: 16px; color: #333; line-height: 1.6; margin: 20px 0; }
      .btn { display: inline-block; background: linear-gradient(135deg, #F2526E 0%, #FF6B8A 100%); color: #FFFFFF; padding: 15px 30px; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; margin-top: 25px; transition: transform 0.2s; }
      .footer { background-color: #333; color: #FFFFFF; text-align: center; padding: 30px 20px; }
      .footer p { margin: 10px 0; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="http://195.35.22.221:4052/logo.png" alt="Logo" />
        <h1>Welcome to Matrimony</h1>
      </div>
      <div class="content">
        <div class="welcome-text">Hello ${username}!</div>
        <p class="description">Thank you for registering with us. Your account has been successfully created.</p>
        <div class="password-box">Your Password: ${code}</div>
        <p class="description">You can now access your dashboard and start exploring all the features of our matrimony service.</p>
        <a href="http://195.35.22.221:4052/" class="btn" style="color: #FFFFFF;">Get Started</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Matrimony. All rights reserved.</p>
        <p>Find your perfect match with us</p>
      </div>
    </div>
  </body>
</html>

    `;

    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Matrimony - Your Account is Ready!',
      html: htmlContent, // Use inline HTML
    });
  }
}
