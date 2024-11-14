// jwt.util.ts
import getEnvVar from 'env/index';
import { sign, verify } from 'jsonwebtoken';
import { CustomJwtPayload } from 'types/jwt.types';

class Jwt {
  static sign(payload: number): string {
    return sign({ id: payload }, getEnvVar('JWT_SIGNING_KEY'), {
      expiresIn: getEnvVar('JWT_EXPIRY'), // Adjust expiration based on access/refresh context
    });
  }

  static verify(token: string): CustomJwtPayload {
    return verify(token, getEnvVar('JWT_SIGNING_KEY')) as CustomJwtPayload;
  }
  static refreshSign(payload: number): string {
    return sign({ id: payload }, getEnvVar('JWT_SIGNING_KEY'), {
      expiresIn: '3600s',
    });
  }
}

export default Jwt;
