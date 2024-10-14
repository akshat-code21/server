import twilio, { Twilio } from 'twilio';

class Otp {
  client: Twilio;
  TWILIO_SERVICE_SID: string;

  constructor(TWILIO_ACCOUNT_SID: string, TWILIO_AUTH_TOKEN: string, TWILIO_SERVICE_SID: string) {
    this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
      lazyLoading: true,
    });
    this.TWILIO_SERVICE_SID = TWILIO_SERVICE_SID;
  }

  async sendOTP(countryCode: string, phoneNumber: string) {
    const otpResponse = await this.client.verify.v2.services(this.TWILIO_SERVICE_SID).verifications.create({
      to: `+${countryCode}${phoneNumber}`,
      channel: 'sms',
    });

    return otpResponse;
  }

  async verifyOTP(countryCode: string, phoneNumber: string, otp: string) {
    const verifiedResponse = await this.client.verify.v2.services(this.TWILIO_SERVICE_SID).verificationChecks.create({
      to: `+${countryCode}${phoneNumber}`,
      code: otp,
    });

    return verifiedResponse;
  }
}

export default Otp;
