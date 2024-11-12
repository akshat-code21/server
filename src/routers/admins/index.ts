// routers/admin/index.ts
import AbstractRouter from '..';
import AdminController from '../../controllers/admin.controller';
// import adminMiddleware from 'middlewares/admin.middleware';

export default class AdminRouter extends AbstractRouter {
  registerMiddlewares() {
    // Apply adminMiddleware to all routes in this router
    return [];
  }

  registerRoutes(): void {
    const adminController = new AdminController(this.ctx);

    this.registerGET('/users', adminController.getAllUsers());
    // this.registerGET('/institutions', adminController.getAllInstitutions());
    this.registerPOST('/assignRole', adminController.assignRoleToUser());
    this.registerDELETE('/user/:id', adminController.deleteUserAccount());
  }
}
