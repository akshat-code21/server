import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { z, ZodError } from 'zod';
import { validateRequestParams, validateRequestBody } from 'validators/validateRequest';
import { InternalServerError } from 'errors/internal-server-error';
import { ProjectType } from '@prisma/client';
import { createProjectSchema } from 'zod_schema';

export default class AdminController extends AbstractController {
  // User management

  getAllUsers() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const users = await this.ctx.users.findMany({
            include: { contributorProfile: true },
          });
          res.status(200).json({ data: users });
        } catch (e) {
          console.error('Error fetching all users:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createAdmin() {
    return [
      validateRequestBody(z.object({ userId: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { userId } = req.body;
          const ADMIN_ROLE_ID = 0;

          const user = await this.ctx.userRoles.findUnique({ where: { userId } });
          if (user?.roleId === ADMIN_ROLE_ID) {
            return res.status(409).json({ message: 'User is already an admin' });
          }

          await this.ctx.userRoles.update({
            where: { userId },
            data: { roleId: ADMIN_ROLE_ID },
          });

          res.status(200).json({ message: 'User promoted to admin successfully' });
        } catch (e) {
          console.error('Error promoting user to admin:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  assignRoleToUser() {
    return [
      validateRequestBody(z.object({ userId: z.number(), roleId: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { userId, roleId } = req.body;
          await this.ctx.userRoles.update({
            where: { userId },
            data: { roleId },
          });
          res.status(200).json({ message: 'Role updated successfully' });
        } catch (e) {
          console.error('Error updating user role:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  deleteUserAccount() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          await this.ctx.users.delete({
            where: { id },
          });
          res.sendStatus(204);
        } catch (e) {
          console.error('Error deleting user account:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  // Project management

  getAllProjects() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const projects = await this.ctx.projects.findMany({});
          res.status(200).json({ data: projects });
        } catch (e) {
          console.error('Error fetching projects:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
  getAllProposals(){
    return[
      async(_:Request,res : Response,next:NextFunction)=>{
        try{
          const proposals = await this.ctx.projects.findMany({});
          res.status(200).json({data : proposals});
        }catch(e){
          console.error("Error fetching projects : ",e);
          next(new InternalServerError());
        }
      }
    ]
  }

  getProjectById() {
    return [
      validateRequestParams(
        z.object({
          id: z
            .string()
            .refine((val) => !isNaN(Number(val)), {
              message: 'ID must be a number',
            })
            .transform((val) => Number(val)),
        })
      ),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const project = await this.ctx.projects.findUnique({ where: { id } });
          if (!project) {
            return res.status(404).json({ error: 'Project not found' });
          }
          res.status(200).json({ data: project });
        } catch (e) {
          console.error('Error fetching project:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
  getProposalById() {
    return [
      validateRequestParams(
        z.object({
          id: z
            .string()
            .refine((val) => !isNaN(Number(val)), {
              message: 'ID must be a number',
            })
            .transform((val) => Number(val)),
        })
      ),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const proposal = await this.ctx.proposals.findUnqiue({ where: { id } });
          if (!proposal) {
            return res.status(404).json({ error: 'proposal not found' });
          }
          res.status(200).json({ data: proposal });
        } catch (e) {
          console.error('Error fetching proposal:', e);
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
          const adminId = req.currentUserId as number;
          const { name, description, type } = req.body as {
            name: string;
            description: string;
            type: ProjectType;
          };
  
          // Ensure adminId is present and valid
          if (!adminId) {
            return res.status(400).json({ msg: 'Admin ID is required' });
          }
  
          // Create the project and connect the proposedBy field to the admin user
          const project = await this.ctx.projects.create({
            data: {
              name,
              description,
              type,
              proposedBy: {
                connect: { id: adminId }, // Ensure 'id' is passed in the correct format
              },
            },
          });
  
          res.status(201).json({ data: project });
        } catch (e) {
          console.error('Error creating project:', e);
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
  

  createProposal(){
    return [
      // validateRequestBody(createProposalSchema),
      // upload.single('pdf_file'),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { details, resources, impact, projectId } = req.body as unknown as {
            details: string;
            resources: string;
            impact: string;
            projectId: string;
          };

          // if (!req.file) {
          //   return res.status(400).send({ error: 'File is required' });
          // }

          // const s3Service = new S3(
          //   getEnvVar('AWS_ACCESS_KEY_ID'),
          //   getEnvVar('AWS_SECRET_ACCESS_KEY'),
          //   getEnvVar('AWS_S3_BUCKET_NAME'),
          //   getEnvVar('AWS_S3_BUCKET_REGION'),
          // );

          // const file = req.file;
          // const fileBuffer = file.buffer;
          // const fileName = file.originalname;

          // await s3Service.uploadFile(fileBuffer, fileName);
          // const fileUrl = await s3Service.getPresignedUrl(fileName);

          // const fileModel = await this.ctx.files.create({
          //   data: {
          //     filename: fileName,
          //     path: fileUrl,
          //   },
          // });

          const userId = req.currentUserId as number;

          const proposal = await this.ctx.proposals.create({
            data: {
              details,
              resources,
              impact,
              project: {
                connect: {
                  id: parseInt(projectId),
                },
              },
              file:{},
              // file: {
              //   connect: {
              //     id: fileModel.id,
              //   },
              // },
              author: {
                connect: {
                  id: userId,
                },
              },
            },
          });

          res.status(201).send({ data: proposal });
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
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const { name, description, type } = req.body;

          const existingProject = await this.ctx.projects.findUnique({ where: { id } });
          if (!existingProject) {
            return res.status(404).json({ error: 'Project not found' });
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
          console.error('Error updating project:', e);
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

  updateProposal(){
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const { name, description, type } = req.body;

          const existingProject = await this.ctx.projects.findUnique({ where: { id } });
          if (!existingProject) {
            return res.status(404).json({ error: 'Project not found' });
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
          console.error('Error updating project:', e);
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
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          await this.ctx.projects.delete({ where: { id } });
          res.sendStatus(204);
        } catch (e) {
          console.error('Error deleting project:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
  deleteProposal(){
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          await this.ctx.projects.delete({ where: { id } });
          res.sendStatus(204);
        } catch (e) {
          console.error('Error deleting project:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
