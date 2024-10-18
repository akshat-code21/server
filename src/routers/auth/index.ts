import AbstractRouter from '..';
import AuthController from 'controllers/auth.controller';

export default class AuthRouter extends AbstractRouter {
  registerMiddlewares() {
    return [];
  }

  registerRoutes(): void {
    const authController = new AuthController(this.ctx);

    this.registerPOST('/register/user', authController.registerUser());
    this.registerPOST('/register/institution', authController.registerInstitution());
    this.registerPOST('/sendOTP', authController.sendOTP());
    this.registerPOST('/signin', authController.signin());
    this.registerPOST('/refreshToken', authController.refreshToken());
    this.registerPOST('/logout', authController.logout());
  }
}
