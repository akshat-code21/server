import getEnvVar from 'env/index';
import { sign, verify } from 'jsonwebtoken';
import { CustomJwtPayload } from 'types/jwt.types';

class Jwt {
  static sign(payload: number): string {
    return sign({ id: payload }, getEnvVar('JWT_SIGNING_KEY'), {
      expiresIn: getEnvVar('JWT_EXPIRY'),
    });
  }

  static verify(token: string): CustomJwtPayload {
    return verify(token, getEnvVar('JWT_SIGNING_KEY')) as CustomJwtPayload;
  }
}

export default Jwt;
