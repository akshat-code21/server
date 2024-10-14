import { JwtPayload } from 'jsonwebtoken';

export type CustomJwtPayload = JwtPayload & {
  id: number;
};
