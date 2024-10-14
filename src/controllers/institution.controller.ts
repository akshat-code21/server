import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { validateRequestParams } from 'validators/validateRequest';
import { InternalServerError } from 'errors/internal-server-error';
import { z } from 'zod';

export default class InstitutionsController extends AbstractController {
  getInstitutions() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const institutions = await this.ctx.institutions.findMany({
            where: {},
          });
          res.status(200).send({ data: institutions });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getInstitution() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const institution = this.ctx.institutions.findUnqiue({
            where: {
              id,
            },
          });
          if (!institution) {
            return res.status(400).send({ err: 'Institution not found' });
          }
          res.status(200).send({ data: institution });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  updateInstitution() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (_: Request, __: Response, next: NextFunction) => {
        try {
          console.log('Update Institution');
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  deleteInstitution() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          await this.ctx.institutions.delete({
            where: { id },
          });
          res.sendStatus(204);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
