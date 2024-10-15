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

          // Database operations wrapped in try-catch for specific error handling
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

          // Email sending wrapped in try-catch
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
      validateRequestBody(z.object({ email: z.string().email(), otp: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email, otp } = req.body as { email: string; otp: string };
          const otpRecord = await this.ctx.OTP.findUnique({
            where: {
              email,
            },
          });

          if (!otpRecord) {
            return res.status(400).json({
              msg: 'OTP Record not found',
            });
          }

          if (!OTP.verify(otp, otpRecord)) {
            return res.status(400).json({
              msg: 'Invalid OTP',
            });
          }

          if (OTP.isExpired(otpRecord)) {
            return res.status(400).json({
              msg: 'OTP has expired',
            });
          }

          await this.ctx.OTP.delete({
            where: {
              id: otpRecord.id,
            },
          });

          // Find or create user
          let user = await this.ctx.users.findUnqiue({
            where: { email },
          });

          if (!user) {
            res.json({
              msg :"Please sign up first"
            })
            return ;
          }

          // Generate JWT token
          const token = Jwt.sign(user.id);

          res.status(200).json({
            msg: 'Sign-in successful',
            token: token,
          });
        } catch (e) {
          console.error('Error in signin:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  logout() {
    return [
      async (req: Request, _: Response, next: NextFunction) => {
        try {
          req.session.currentUserId = undefined;
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
