// routers/admin/index.ts
import AbstractRouter from '..';
import AdminController from '../../controllers/admin.controller';
// import adminMiddleware from '../../middlewares/admin.middleware';

export default class AdminRouter extends AbstractRouter {
  registerMiddlewares() {
    // Apply adminMiddleware to all routes in this router to ensure only admins can access
    return [];
  }

  registerRoutes(): void {
    const adminController = new AdminController(this.ctx);

    // User management routes
    this.registerGET('/users', adminController.getAllUsers());
    this.registerPOST('/assignRole', adminController.assignRoleToUser());
    this.registerDELETE('/user/:id', adminController.deleteUserAccount());

    // Project management routes
    this.registerGET('/projects', adminController.getAllProjects());
    this.registerGET('/project/:id', adminController.getProjectById());
    this.registerPOST('/project', adminController.createProject());
    this.registerPUT('/project/:id', adminController.updateProject());
    this.registerDELETE('/project/:id', adminController.deleteProject());
  }
}
