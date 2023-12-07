import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transporter() {
    const testAccount = await nodemailer.createTestAccount();

    const transport = nodemailer.createTransport({
      host: 'mailhog',
      port: 1025,
      ignoreTLS: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return transport;
  }

  async sendSignupConfirmation(userEmail: string) {
    (await this.transporter()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Inscription',
      html: '<h3>Confirmation of inscription </h3>',
    });
  }

  async sendResetPassword(userEmail: string, url: string, code: string) {
    (await this.transporter()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Reset password',
      html: `
        <a href="${url}">Reset password</a>
        <p>Secret code <strong>${code}</strong></p>
        <p>Code will expire in 15 minutes</p>
      `,
    });
  }

  async sendConfirmation(userEmail: string) {
    (await this.transporter()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Confirmation password updated',
      html: `
        <h3>Your password has been updated !</h3>
      `,
    });
  }
}
