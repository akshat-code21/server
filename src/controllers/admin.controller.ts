import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { z } from 'zod';
import { validateRequestParams, validateRequestBody } from 'validators/validateRequest';
import { InternalServerError } from 'errors/internal-server-error';

export default class AdminController extends AbstractController {
  getAllUsers() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const users = await this.ctx.users.findMany({
            include: {
              contributorProfile: true,
            },
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
          const ADMIN_ROLE_ID = 1; // Example role ID for admin

          // Ensure user is not already an admin
          const user = await this.ctx.userRoles.findUnique({ where: { userId } });
          if (user?.roleId === ADMIN_ROLE_ID) {
            return res.status(409).json({ message: 'User is already an admin' });
          }

          // Assign the admin role to the user
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

  // Assign a specific role to a user
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
}
