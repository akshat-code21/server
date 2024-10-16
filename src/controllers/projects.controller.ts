import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { InternalServerError } from 'errors/internal-server-error';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import { z, ZodError } from 'zod';
import { createProjectSchema } from 'zod_schema';
import { ProjectType } from '@prisma/client';

const getProjectParamsSchema = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'ID must be a number',
    })
    .transform((val) => Number(val)),
});

export default class ProjectsController extends AbstractController {
  getProjects() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {        
        try {
          const userId = req.currentUserId;
          if (!userId) {
            return res.status(400).json({ error: 'User ID not found in request.' });
          }

          const projects = await this.ctx.projects.findMany({
            where: {
              proposedBy: {
                id: userId,
              },
            },
          });

          console.log('Fetched projects:', projects);

          res.status(200).json({ data: projects });
        } catch (e) {
          console.log('here at error');
          console.error('Error fetching projects:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getProject() {
    return [
      validateRequestParams(getProjectParamsSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          console.log('Fetching project with ID:', id);
          const project = await this.ctx.projects.findUnique({
            where: {
              id: id,
            },
          });
          if (!project) {
            return res.status(404).json({ error: 'Project not found' });
          }
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
          const { name, description, type } = req.body as {
            name: string;
            description: string;
            type: ProjectType;
          };
          if (!name || !description || !type) {
            return res.status(400).json({
              error: 'Missing required fields: name, description, or type',
            });
          }
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
          return res.status(201).json({ data: project });
        } catch (e) {
          console.error('Error while creating project:', e);

          if (e instanceof ZodError) {
            return res.status(400).json({
              error: 'Invalid request parameters',
              details: e.errors,
            });
          }
          next(new InternalServerError());
        }
      },
    ];
  }

  updateProject() {
    return [
      validateRequestParams(getProjectParamsSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const { name, description, type } = req.body;

          const existingProject = await this.ctx.projects.findUnique({
            where: { id },
          });

          if (!existingProject) {
            return res.status(404).json({ error: 'Project not found.' });
          }

          const updatedProject = await this.ctx.projects.update({
            where: { id },
            data: {
              name: name ?? existingProject.name,
              description: description ?? existingProject.description,
              type: type ?? existingProject.type,
            },
          });

          res.status(200).json({ data: updatedProject });
        } catch (e) {
          console.error('Error while updating project:', e);

          if (e instanceof ZodError) {
            return res.status(400).json({
              error: 'Invalid request parameters',
              details: e.errors,
            });
          }

          next(new InternalServerError());
        }
      },
    ];
  }

  deleteProject() {
    return [
      validateRequestParams(getProjectParamsSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const deletedProject = await this.ctx.projects.delete({
            where: { id },
          });

          res.sendStatus(204).json({
            deletedProject,
          });
        } catch (e) {
          console.error('Error while deleting project:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
