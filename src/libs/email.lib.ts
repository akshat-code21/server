import getEnvVar from 'env/index';
import { ISendEmail } from 'interfaces/libs';
import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import fs from 'fs';

export class Email {
  #transporter: Transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: getEnvVar('SMTP_HOST'),
      port: parseInt(getEnvVar('SMTP_PORT')),
      secure: getEnvVar('SMTP_SECURE') === 'true',
      auth: {
        user: getEnvVar('SMTP_HOST_USER'),
        pass: getEnvVar('SMTP_HOST_PASS'),
      },
    });
  }

  private readFile(fileName: string): string {
    const filePath = path.join(__dirname, '..', '..', 'templates', fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  }

  async testConnection() {
    try {
      await this.#transporter.verify();
      console.log('SMTP connection successful');
    } catch (error) {
      console.error('SMTP connection failed:', error);
    }
  }

  async sendEmail({ email, otp }: ISendEmail): Promise<void> {
    const htmlTemplate = this.readFile('otp.html');
    const formattedHtml = htmlTemplate.replace('{{OTP}}', otp.toString());

    const info = await this.#transporter.sendMail({
      from: getEnvVar('SMTP_HOST_USER'),
      to: email,
      subject: 'OTP for Verification for Bhashini Student Contribution Platform',
      html: formattedHtml,
    });

    console.log('Invite sent: %s', info);
  }
}

const emailService = new Email();
export default emailService;
