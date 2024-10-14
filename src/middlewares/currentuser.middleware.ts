import { AuthenticationError } from 'errors/authentication-error';
import { UserNotFoundError } from 'errors/user-not-found-error';
import { NextFunction, Request, Response } from 'express';
import { IContext } from 'interfaces/index';
import Jwt from 'utils/jwt.util';

export const currentUserMiddleware = (ctx: IContext) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(401).json(new AuthenticationError('Please provide a valid token'));
    }
    let decoded;
    try {
      const token = req.headers.authorization.split(' ')[1];
      decoded = Jwt.verify(token);
      res.json({
        token : token
      })
    } catch (error) {
      console.log('Error while decoding: ', error);
      return res.status(403).send(new AuthenticationError('Please provide a valid token'));
    }

    try {
      const user = await ctx.users.findUnqiue({
        where: {
          id: decoded.id,
        },
      });
      if (!user) {
        return res.status(404).json(new UserNotFoundError('User not found'));
      }

      req.currentUserId = user.id;
      next();
    } catch (error) {
      return res.status(500).json(new AuthenticationError('Authentication failed'));
    }
  };
};

export default currentUserMiddleware;
