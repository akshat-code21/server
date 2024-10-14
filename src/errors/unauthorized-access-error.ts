import { CustomError } from './custom-error';

export class UnauthorizedAccess extends CustomError {
  statusCode = 401;

  constructor() {
    super('Unauthorized Access');
    Object.setPrototypeOf(this, UnauthorizedAccess.prototype);
  }

  serializeErrors() {
    return [{ message: 'Unauthorized Access' }];
  }
}
