import Jwt from '../../src/utils/jwt.util';
import { sign } from 'jsonwebtoken';
import { describe, it, expect } from '@jest/globals';
import getEnvVar from '../../src/env';

describe('sign token without signing key', () => {
  it('throws an error, because no key passed', () => {
    expect(() => {
      Jwt.sign(12345678);
    });
  });
});

describe('signs a token with signing key', () => {
  const toSign = 12345678;
  process.env['JWT_SIGNING_KEY'] = 'key';
  process.env['JWT_EXPIRY'] = '1s';
  const expectedToken = sign({ id: toSign }, getEnvVar('JWT_SIGNING_KEY'), { expiresIn: getEnvVar('JWT_EXPIRY') });

  it('returns the corresponding token', () => {
    expect(Jwt.sign(toSign)).toBe(expectedToken);
  });
});

describe('verify signed token', () => {
  const toSign = 12345678;
  const signed = Jwt.sign(toSign);
  const decoded = Jwt.verify(signed);
  it('decoded object should have valid claims', () => {
    expect(decoded).toEqual(
      expect.objectContaining({
        exp: expect.any(Number),
        iat: expect.any(Number),
        id: toSign,
      }),
    );
  });
});
