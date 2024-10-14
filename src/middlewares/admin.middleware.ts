import { UnauthorizedAccess } from 'errors/unauthorized-access-error';
import { NextFunction, Request, Response } from 'express';
import { IContext } from 'interfaces/index';

export const adminMiddleware = (ctx: IContext) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUserId;

    try {
      const userRole = await ctx.userRoles.findUnique({ where: { userId } });
      if (!userRole) {
        return res.status(401).send(new UnauthorizedAccess());
      }

      const role = await ctx.roles.findUnique({ where: { id: userRole.roleId } });
      if (!role || role.value !== 0) {
        return res.status(401).send(new UnauthorizedAccess());
      }

      next();
    } catch (error) {
      return res.status(500).send(error);
    }
  };
};

export default adminMiddleware;
