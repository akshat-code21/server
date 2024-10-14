import currentUserMiddleware from 'middlewares/currentuser.middleware';
import AbstractRouter from '..';
import ProposalsController from 'controllers/proposals.controller';

export default class ProposalsRouter extends AbstractRouter {
  registerMiddlewares() {
    return [() => currentUserMiddleware(this.ctx)];
  }

  registerRoutes(): void {
    const proposalsController = new ProposalsController(this.ctx);

    this.registerGET('/', proposalsController.getProposals());
    this.registerPOST('/', proposalsController.createProposal());
    this.registerGET('/:id', proposalsController.getProposal());
    this.registerPUT('/:id', proposalsController.updateProposal());
    this.registerDELETE('/:id', proposalsController.deleteProposal());
    this.registerGET('/:id/comments', proposalsController.getComments());
    this.registerPOST('/:id/comments', proposalsController.addComment());
    this.registerPUT('/:id/comments/:commentId', proposalsController.updateComment());
    this.registerPUT('/:id/approve', proposalsController.approveProposal());
    this.registerPUT('/:id/reject', proposalsController.rejectProposal());
    this.registerPOST('/:id/mous', proposalsController.createMOU());
    this.registerGET('/:id/mous', proposalsController.getMOU());
    this.registerPUT('/:id/mous/approve', proposalsController.approveMOU());
  }
}
