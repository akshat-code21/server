import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { InternalServerError } from 'errors/internal-server-error';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import { z, ZodError } from 'zod';
import { createProjectSchema } from 'zod_schema';
import { ProjectType } from '@prisma/client';

export default class ProjectsController extends AbstractController {
  getProjects() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          console.log('Request Headers:', req.headers); // Log all headers
          const userId = req.currentUserId;
          console.log('User ID:', userId); // Should log correct user ID or undefined
  
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
          console.error('Error fetching projects:', e);
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
      validateRequestBody(createProjectSchema), // Validate request body with Zod
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.currentUserId as number; // Get the userId from the middleware
  
          // Add validation logs to debug request body issues
          console.log('Request body:', req.body);
  
          const { name, description, type } = req.body as {
            name: string;
            description: string;
            type: ProjectType;
          };
  
          // Check for missing required fields
          if (!name || !description || !type) {
            return res.status(400).json({
              error: 'Missing required fields: name, description, or type',
            });
          }
  
          // Create the project and associate it with the current user
          const project = await this.ctx.projects.create({
            data: {
              name,
              description,
              type,
              proposedBy: {
                connect: {
                  id: userId, // Associate with the user creating the project
                },
              },
            },
          });
  
          // Return the created project in the response
          return res.status(201).json({ data: project });
  
        } catch (e) {
          console.error('Error while creating project:', e);
  
          if (e instanceof ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({
              error: 'Invalid request parameters',
              details: e.errors,
            });
          }
  
          // Handle any other errors
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
