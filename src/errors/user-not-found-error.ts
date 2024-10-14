import { CustomError } from './custom-error';

export class UserNotFoundError extends CustomError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
