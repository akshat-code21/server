import {currentUserMiddleware} from 'middlewares/currentuser.middleware';
import AbstractRouter from '..';
import ProjectsController from 'controllers/projects.controller';

export default class ProjectsRouter extends AbstractRouter {

  registerMiddlewares() {
    return [() => currentUserMiddleware(this.ctx)];
  }

  registerRoutes(): void {
    const projectsController = new ProjectsController(this.ctx);

    this.registerGET('/', projectsController.getProjects());
    this.registerPOST('/', projectsController.createProject());
    this.registerGET('/:id', projectsController.getProject());
    this.registerPUT('/:id', projectsController.updateProject());
    this.registerDELETE('/:id', projectsController.deleteProject());
  }
}
