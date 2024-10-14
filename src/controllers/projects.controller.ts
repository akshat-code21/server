import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { InternalServerError } from 'errors/internal-server-error';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import { z } from 'zod';
import { createProjectSchema } from 'zod_schema';
import { ProjectType } from '@prisma/client';

export default class ProjectsController extends AbstractController {
  getProjects() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const projects = await this.ctx.projects.findMany({
            where: {},
          });
          res.status(200).send({ date: projects });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getProject() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const project = await this.ctx.projects.findUnqiue({
            where: { id },
          });
          res.status(200).send({ data: project });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createProject() {
    return [
      validateRequestBody(createProjectSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.currentUserId as number;
          const { name, description, type } = req.body as unknown as { name: string; description: string; type: ProjectType };

          const project = await this.ctx.projects.create({
            data: {
              name,
              description,
              type,
              proposedBy: {
                connect: {
                  id: userId,
                },
              },
            },
          });

          res.status(201).send({ data: project });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  updateProject() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      validateRequestBody(z.object({})),
      async (_: Request, __: Response, next: NextFunction) => {
        try {
          // const { id } = req.params as unknown as { id: number };
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  deleteProject() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          await this.ctx.projects.delete({
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
