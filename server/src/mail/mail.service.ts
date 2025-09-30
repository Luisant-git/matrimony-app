import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(to: string, username: string, code: string) {
    // Define the email content with inline HTML
    const htmlContent = `
 <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }

      .email-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        padding-bottom: 20px;
      }

      .header img {
        width: 300px;
      }

      .title {
        color: #333;
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }

      .content {
        text-align: center;
        padding: 30px;
      }

      .content p {
        font-size: 16px;
        color: #666;
        line-height: 1.5;
      }

      .btn {
        display: inline-block;
        background-color: #6f5ce5;
        color: white;
        padding: 12px 25px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        margin-top: 20px;
      }

      .app-links {
        text-align: center;
        padding: 20px;
        border-top: 1px solid #eee;
      }

      .app-links img {
        width: 120px;
        margin: 10px;
      }

      .footer {
        text-align: center;
        color: #888;
        font-size: 12px;
        padding: 10px;
      }

      .social-links img {
        width: 54px;
        margin: 0 5px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img  alt="Logo" />
      </div>
      <div class="content">
        <h1 class="title">Password : ${code}</h1>
        <h2 class="title">Thanks for registering, ${username}</h2>
        <p>Your account has been successfully created. You can now access your dashboard and start exploring all the features of our service.</p>
        <a   class="btn"><span style="color:white" >Get started</span></a>
      </div>
      <div class="footer">
        <p>Follow us on:</p>
        <div class="social-links">
          <a href="#"><img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151320973.jpg?w=740&t=st=1726668515~exp=1726669115~hmac=4ed22d400bddc9e46315dcf2a50b5061092438075910bcd9742241d9d8a21a47" alt="Facebook" /></a>
          <a href="#"><img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151320965.jpg?w=740&t=st=1726668486~exp=1726669086~hmac=235f10282eff556a1d159d2ab0ea20897e0b27580b8d047f08c1a971354087a3" alt="LinkedIn" /></a>
          <a href="#"><img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151320963.jpg?w=740&t=st=1726668498~exp=1726669098~hmac=090526455a0f2460247c31bd6b4ede62f52f16bd8427aef58d9333e818dd028d" alt="Instagram" /></a>
        </div>
        <p>&copy; 2024 ShoppingSto. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

    `;

    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to My App! Confirm your Email',
      html: htmlContent, // Use inline HTML
    });
  }
}
