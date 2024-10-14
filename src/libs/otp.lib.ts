import otpGenerator from 'otp-generator';
import { OTP as OTPRecord } from '@prisma/client';

class OTP {
  static generate(): string {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    return otp;
  }

  static verify(otp: string, otpRecord: OTPRecord): boolean {
    return otp === otpRecord.otp;
  }

  static isExpired(otpRecord: OTPRecord): boolean {
    const otpExpiryDuration = 5 * 60 * 1000;
    const currentTime = new Date().getTime();
    const otpCreationTime = new Date(otpRecord.createdAt).getTime();

    if (currentTime - otpCreationTime > otpExpiryDuration) {
      return true;
    } else {
      return false;
    }
  }
}

export default OTP;
