import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import { InternalServerError } from 'errors/internal-server-error';
import { z } from 'zod';
import { ContributorType } from '@prisma/client';
import { addContributorProfileSchema } from 'zod_schema';

type contributorProfileUpdateBody = {
  occupation: string;
  experience: number;
  aadhar: string;
  pan: string;
  github: string;
  linkedin: string;
  contributionDuration: number;
};

export default class UsersController extends AbstractController {
  getUsers() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const users = await this.ctx.users.findMany({
            where: {},
            include: {
              contributorProfile: true,
            },
          });
          res.status(200).send({ data: users });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getUser() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const user = this.ctx.users.findUnqiue({
            where: {
              id,
            },
            include: {
              contributorProfile: true,
            },
          });
          if (!user) {
            return res.status(400).send({ err: 'User not found' });
          }
          res.status(200).send({ data: user });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  addContributorProfile() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(addContributorProfileSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          const { occupation, experience, aadhar, pan, github, linkedin, contributionDuration } = req.body as unknown as contributorProfileUpdateBody;

          const contributorProfile = await this.ctx.contributorProfiles.create({
            data: {
              occupation,
              experience,
              aadhar,
              pan,
              github,
              linkedin,
              contributionDuration,
              type: ContributorType.INDIVIDUAL,
              user: {
                connect: {
                  id: parseInt(id),
                },
              },
            },
          });

          console.log(contributorProfile);
          res.sendStatus(204);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  updateUser() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (_: Request, __: Response, next: NextFunction) => {
        try {
          console.log('Update User');
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  deleteUser() {
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
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
