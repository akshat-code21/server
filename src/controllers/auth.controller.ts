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
          const { name, email, phoneNumber } = req.body;
          
          // Check if user already exists by phone or email
          const existingUser = await this.ctx.users.findFirst({
            where: { OR: [{ phone: phoneNumber }, { email }] },
          });
  
          if (existingUser) {
            return res.status(409).json({ error: 'User with this phone or email already exists' });
          }
  
          // Create new user
          const newUser = await this.ctx.users.create({
            data: { name, email, phone: phoneNumber },
          });
  
          // Assign role to user in userRoles table
          await this.ctx.userRoles.create({
            data: { userId: newUser.id, roleId: 1 }, // `roleId: 1` for regular user
          });
  
          res.status(201).json({ msg: 'User created successfully', data: newUser });
        } catch (e) {
          console.error('Error registering user:', e);
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

// <<<<<<< master
          // Authenticate user (this would be your actual user validation logic)
          const user = await this.ctx.users.findUnqiue({
            where: { email }, // Replace with secure password validation
          });

          if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
// =======
          await this.ctx.OTP.delete({
            where: {
              id: otpRecord.id,
            },
          });
          let user = await this.ctx.users.findUnqiue({
            where: { email },
          });

          if (!user) {
            res.json({
              msg: 'Please sign up first',
            });
            return;
// >>>>>>> master
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
// <<<<<<< master
    console.log('refreshtoken called');
=======
// >>>>>>> master
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Extract the refresh token from the request body
          const { refreshToken } = req.body;
// <<<<<<< master
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
// =======

          // Verify refresh token
          const decoded = Jwt.verify(refreshToken);
          const userId = decoded.id;

          const user = await this.ctx.users.findUnqiue({
            where: { id: userId },
          });
// >>>>>>> master

          if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
          }

          // Generate new tokens
// <<<<<<< master
          const newToken = Jwt.sign(user.id); // Access token
          const newRefreshToken = Jwt.sign(user.id); // Refresh token
          console.log(newToken);
          console.log(newRefreshToken);

          // Send the new tokens back
// =======
          const newToken = Jwt.sign(user.id);
          const newRefreshToken = Jwt.sign(user.id);

          // Send new tokens
// >>>>>>> master
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
  
  registerAdmin() {
    return [
      validateRequestBody(z.object({ name: z.string(), email: z.string().email(), phoneNumber: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { name, email, phoneNumber } = req.body;
          
          // Check if admin already exists by phone or email
          const existingAdmin = await this.ctx.users.findFirst({
            where: { OR: [{ phone: phoneNumber }, { email }] },
          });
  
          if (existingAdmin) {
            return res.status(409).json({ error: 'Admin with this phone or email already exists' });
          }
  
          // Fetch the role ID for the 'admin' role from the Roles table
          const adminRole = await this.ctx.roles.findFirst({
            where: { name: 'admin' },
        });

          console.log(adminRole);

          if (!adminRole) {
            return res.status(500).json({ error: 'Admin role not found in Roles table.' });
          }

          // Create new admin
          const newAdmin = await this.ctx.users.create({
            data: { name, email, phone: phoneNumber },
          });
  
          // Assign the admin role in the UserRoles table
          await this.ctx.userRoles.create({
            data: { userId: newAdmin.id, roleId: adminRole.id },
          });
  
          res.status(201).json({ msg: 'Admin created successfully', data: newAdmin });
        } catch (e) {
          console.error('Error creating admin:', e);
          next(new InternalServerError());
        }
      },
    ];
  }


  sendAdminOTP() {
    return [
      validateRequestBody(z.object({ email: z.string().email() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email } = req.body;
          const otp = OTP.generate();

          await this.ctx.OTP.deleteMany({ where: { email } });
          await this.ctx.OTP.create({ data: { email, otp } });

          await emailService.sendEmail({ email, otp });

          res.status(200).json({ msg: 'Admin OTP sent successfully' });
        } catch (e) {
          console.error('Error in sendAdminOTP:', e);
          next(new InternalServerError());
        }
      },
    ];
  }

  adminSignin() {
    return [
      validateRequestBody(z.object({ email: z.string().email(), otp: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email, otp } = req.body;
          const otpRecord = await this.ctx.OTP.findUnique({ where: { email } });

          if (!otpRecord || !OTP.verify(otp, otpRecord) || OTP.isExpired(otpRecord)) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
          }

          await this.ctx.OTP.delete({ where: { id: otpRecord.id } });

          const admin = await this.ctx.users.findUnqiue({
            where: { email },
            select: { id: true },
          });

          if (!admin) {
            return res.status(403).json({ msg: 'Access denied. Not an admin account' });
          }

          const token = Jwt.sign(admin.id);
          res.status(200).json({ msg: 'Admin sign-in successful', token });
        } catch (e) {
          console.error('Error in adminSignin:', e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
