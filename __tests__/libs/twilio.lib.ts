import Otp from '../../src/libs/twilio.lib';
import { beforeEach, describe, expect, it } from '@jest/globals';
import getEnvVar, { parseEnv } from '../../src/env/index';

describe('Otp', () => {
  let otp: Otp;
  parseEnv();
  beforeEach(() => {
    otp = new Otp(getEnvVar('TWILIO_ACCOUNT_SID'), getEnvVar('TWILIO_AUTH_TOKEN'), getEnvVar('TWILIO_SERVICE_SID'));
  });

  describe('sendOTP', () => {
    it('should send OTP via SMS', async () => {
      const otpResponse = await otp.sendOTP('91', getEnvVar('TWILIO_PHONE_NUMBER'));

      expect(otpResponse).toEqual(
        expect.objectContaining({
          sid: expect.any(String),
          serviceSid: expect.any(String),
          accountSid: expect.any(String),
          to: expect.any(String),
          channel: 'sms',
          status: 'pending',
          valid: false,
          lookup: { carrier: null },
          sendCodeAttempts: expect.arrayContaining([
            expect.objectContaining({
              attempt_sid: expect.any(String),
              channel: 'sms',
              time: expect.any(String),
            }),
          ]),
          url: expect.any(String),
        }),
      );
    });
  });

  describe('verifyOTP', () => {
    it('should verify OTP', async () => {
      const verifiedResponse = await otp.verifyOTP('91', getEnvVar('TWILIO_PHONE_NUMBER'), '000000');
      expect(verifiedResponse).toEqual(
        expect.objectContaining({
          sid: expect.any(String),
          serviceSid: expect.any(String),
          accountSid: expect.any(String),
          to: expect.any(String),
          channel: 'sms',
          status: 'pending',
          valid: false,
        }),
      );
    });
  });
});
