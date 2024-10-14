import AbstractRouter from '..';
import UsersController from 'controllers/users.controller';

export default class UsersRouter extends AbstractRouter {
  registerMiddlewares() {
    return [];
  }

  registerRoutes(): void {
    const usersController = new UsersController(this.ctx);

    this.registerGET('/', usersController.getUsers());
    this.registerGET('/:id', usersController.getUser());
    this.registerPUT('/:id', usersController.updateUser());
    this.registerPUT('/:id/addProfile', usersController.addContributorProfile());
    this.registerDELETE('/:id', usersController.deleteUser());
  }
}
