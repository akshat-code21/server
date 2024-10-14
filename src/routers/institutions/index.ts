import AbstractRouter from '..';
import InstitutionsController from 'controllers/institution.controller';

export default class InstitutionsRouter extends AbstractRouter {
  registerMiddlewares() {
    return [];
  }

  registerRoutes(): void {
    const institutionsController = new InstitutionsController(this.ctx);

    this.registerGET('/', institutionsController.getInstitutions());
    this.registerGET('/:id', institutionsController.getInstitution());
    this.registerPUT('/:id', institutionsController.updateInstitution());
    this.registerDELETE('/:id', institutionsController.deleteInstitution());
  }
}
