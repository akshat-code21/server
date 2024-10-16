import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { InternalServerError } from 'errors/internal-server-error';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import { z, ZodError } from 'zod';
import { createProjectSchema } from 'zod_schema';
import { ProjectType } from '@prisma/client';

const getProjectParamsSchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)), {
    message: "ID must be a number",
  }).transform((val) => Number(val)), // Converts the string to a number
});

const updateProjectSchema = z.object({
  name: z.string().optional(), // Optional fields for update
  description: z.string().optional(),
  type: z.nativeEnum(ProjectType).optional(),
});

export default class ProjectsController extends AbstractController {
  getProjects() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        console.log('here at getProjects');
        try {
          console.log('Request Headers:', req.headers);
          const userId = req.currentUserId;
          console.log('User ID:', userId);

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
      validateRequestParams(getProjectParamsSchema), // Use the correct schema here
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          console.log('Fetching project with ID:', id);
          const project = await this.ctx.projects.findUnique({
            where: { 
              id: id 
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
      validateRequestParams(getProjectParamsSchema), // Ensure ID is a positive integer
      validateRequestBody(updateProjectSchema), // Validate request body with Zod
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const { name, description, type } = req.body;
  
          // Fetch the existing project
          const existingProject = await this.ctx.projects.findUnique({
            where: { id },
          });
  
          if (!existingProject) {
            return res.status(404).json({ error: 'Project not found.' });
          }
  
          // Update the project with provided fields
          const updatedProject = await this.ctx.projects.update({
            where: { id },
            data: {
              name: name ?? existingProject.name, // Use existing name if not provided
              description: description ?? existingProject.description, // Use existing description if not provided
              type: type ?? existingProject.type, // Use existing type if not provided
            },
          });
  
          res.status(200).json({ data: updatedProject });
        } catch (e) {
          console.error('Error while updating project:', e);
  
          if (e instanceof ZodError) {
            // Handle Zod validation errors
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
      validateRequestParams(getProjectParamsSchema), // Ensure ID is a positive integer
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const deletedProject = await this.ctx.projects.delete({
            where: { id },
          });
  
          res.sendStatus(204).json({
            deletedProject
          }); // No Content response
        } catch (e) {
          console.error('Error while deleting project:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
