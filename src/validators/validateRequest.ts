import { InternalServerError } from 'errors/internal-server-error';
import { RequestValidationError } from 'errors/request-validation-error';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequestQuery = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (e) {
      console.log('Query');
      if (e instanceof ZodError) {
        return next(new RequestValidationError(e));
      }
      next(new InternalServerError());
    }
  };
};

export const validateRequestBody = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      // Log the incoming request body for debugging
      console.log('Incoming request body:', req.body);

      // Validate the request body against the schema
      req.body = schema.parse(req.body);

      // Call the next middleware or route handler
      next();
    } catch (e) {
      // Log detailed validation errors
      if (e instanceof ZodError) {
        console.error('Validation errors:', e.errors); // Log validation errors to the console
        return next(new RequestValidationError(e)); // Pass detailed errors to your custom error handler
      }

      // Handle other types of errors
      console.error('Unexpected error:', e);
      next(new InternalServerError());
    }
  };
};

export const validateRequestParams = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (e) {
      console.log('Params');
      if (e instanceof ZodError) {
        return next(new RequestValidationError(e));
      }
      next(new InternalServerError());
    }
  };
};
