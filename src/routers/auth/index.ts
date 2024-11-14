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
    this.registerPOST('/register/admin', authController.registerAdmin());
    this.registerPOST('/sendOTP', authController.sendOTP());
    this.registerPOST('/sendOTP/admin', authController.sendAdminOTP());
    this.registerPOST('/signin', authController.signin());
    this.registerPOST('/signin/admin', authController.adminSignin());
    this.registerPOST('/refreshToken', authController.refreshToken());
    this.registerPOST('/logout', authController.logout());
  }
}
