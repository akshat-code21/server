import { IContext } from 'interfaces/index';

export default abstract class AbstractController {
  ctx: IContext;
  constructor(ctx: IContext) {
    this.ctx = ctx;
  }
}
