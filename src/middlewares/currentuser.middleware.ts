import { NextFunction, Request, Response } from 'express';
import { IContext } from 'interfaces/index';
import Jwt from 'utils/jwt.util';

export const currentUserMiddleware = (ctx: IContext) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check if Authorization header is provided
    if (!req.headers.authorization) {
      console.log('No authorization header provided');
      return res.status(401).json({ error: 'Please provide a valid token' });
    }

    try {
      const token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer token"
      if (!token) {
        console.log('Token is missing');
        return res.status(401).json({ error: 'Token is missing or invalid' });
      }

      // Verify the JWT token
      const decoded = Jwt.verify(token);

      // Fetch user by decoded ID
      const user = await ctx.users.findUnqiue({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        console.log(`User not found for id: ${decoded.id}`);
        return res.status(404).json({ error: 'User not found' });
      }

      // Attach the user ID to the request
      req.currentUserId = user.id;
      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      console.error('Error in currentUserMiddleware:', error);

      // Check for expired token
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Access token expired',
          message: 'Please refresh your access token',
        });
      }

      // Handle other errors
      return res.status(401).json({
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  };
};
