import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { validateRequestBody } from 'validators/validateRequest';
import { z } from 'zod';
import { InternalServerError } from 'errors/internal-server-error';
import Context from 'models/Context';
import OTP from 'libs/otp.lib';
import emailService from 'libs/email.lib';
import Jwt from 'utils/jwt.util';

export default class AuthController extends AbstractController {
  constructor(ctx: Context) {
    super(ctx);
  }

  registerUser() {
    return [
      validateRequestBody(z.object({ name: z.string(), email: z.string().email(), phoneNumber: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { name, email, phoneNumber } = req.body as unknown as { name: string; email: string; phoneNumber: string };
          let existingUser = await this.ctx.users.findFirst({
            where: {
              OR: [{ phone: phoneNumber }, { email }],
            },
          });

          if (existingUser) {
            return res.status(409).json({ error: 'User with this phone or email already exists' });
          }

          existingUser = await this.ctx.users.create({
            data: {
              name,
              email,
              phone: phoneNumber,
            },
          });

          res.status(201).json({ msg: 'User created successfully' });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  registerInstitution() {
    return [
      validateRequestBody(
        z.object({ name: z.string(), email: z.string(), phoneNumber: z.string(), established: z.string().transform((str) => new Date(str)) }),
      ),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { name, email, phoneNumber, established } = req.body as { name: string; email: string; phoneNumber: string; established: Date };
          const existingInstitution = await this.ctx.institutions.findFirst({
            where: {
              OR: [{ phone: phoneNumber }, { email }],
            },
          });

          if (existingInstitution) {
            return res.status(409).json({ error: 'Institution with this phone or email already exists' });
          }

          const institution = await this.ctx.institutions.create({
            data: {
              name,
              email,
              phone: phoneNumber,
              estabilished: established,
            },
          });

          res.status(201).send({ data: institution });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  sendOTP() {
    return [
      validateRequestBody(z.object({ email: z.string().email() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email } = req.body as { email: string };
          const otp = OTP.generate();
          try {
            await this.ctx.OTP.deleteMany({
              where: { email },
            });

            await this.ctx.OTP.create({
              data: {
                email,
                otp,
              },
            });
          } catch (dbError) {
            console.error('Database operation failed:', dbError);
            return next(new InternalServerError());
          }
          try {
            await emailService.sendEmail({ email, otp });
          } catch (emailError) {
            console.error('Email sending failed:', emailError);
            return next(new InternalServerError());
          }

          res.status(200).json({
            msg: 'OTP sent successfully',
          });
        } catch (e) {
          console.error('Unexpected error in OTP generation:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  signin() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email } = req.body;

          // Authenticate user (this would be your actual user validation logic)
          const user = await this.ctx.users.findUnqiue({
            where: { email }, // Replace with secure password validation
          });

          if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
          }

          // Generate tokens
          const accessToken = Jwt.sign(user.id); // Short expiration
          const refreshToken = Jwt.refreshSign(user.id); // Longer expiration

          // Send tokens to client
          res.status(200).json({
            token: accessToken,
            refreshToken: refreshToken,
          });
        } catch (e) {
          console.error('Error during login:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  refreshToken() {
    console.log('refreshtoken called');
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Extract the refresh token from the request body
          const { refreshToken } = req.body;
          console.log(refreshToken);

          // Verify and decode the refresh token
          const decoded = Jwt.verify(refreshToken); // This will throw if the token is expired
          const userId = decoded.id;
          console.log(userId);

          // Check for user existence
          const user = await this.ctx.users.findUnqiue({
            where: { id: userId },
          });
          console.log(user);

          if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
          }

          // Generate new tokens
          const newToken = Jwt.sign(user.id); // Access token
          const newRefreshToken = Jwt.sign(user.id); // Refresh token
          console.log(newToken);
          console.log(newRefreshToken);

          // Send the new tokens back
          res.status(200).json({
            token: newToken,
            refreshToken: newRefreshToken,
          });
        } catch (e) {
          // Cast `e` as an `Error` for TypeScript to recognize its properties
          const error = e as Error;

          console.error('Error refreshing token:', error);

          if (error.name === 'TokenExpiredError') {
            // Handle expired refresh token
            return res.status(403).json({ msg: 'Refresh token expired' });
          }

          next(new InternalServerError());
        }
      },
    ];
  }

  logout() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          req.session.currentUserId = undefined;
          res.status(200).json({ message: 'Logged out successfully' });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
