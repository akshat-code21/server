import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { validateRequestParams, validateRequestBody } from 'validators/validateRequest';
import { InternalServerError } from 'errors/internal-server-error';
import { z } from 'zod';
import { ProposalCommentState, ProposalState } from '@prisma/client';
import multer from 'multer';
import S3 from 'libs/s3.lib';
import getEnvVar from 'env/index';

const upload = multer({ dest: 'uploads/' });

export default class ProposalsController extends AbstractController {
  getProposals() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const proposals = await this.ctx.proposals.findMany({
            where: {},
          });
          res.status(200).send({ date: proposals });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getProposal() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const proposal = await this.ctx.proposals.findUnqiue({
            where: { id },
          });
          res.status(200).send({ data: proposal });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createProposal() {
    return [
      // validateRequestBody(createProposalSchema),
      upload.single('file'),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { details, resources, impact, projectId } = req.body as unknown as {
            details: string;
            resources: string;
            impact: string;
            projectId: string;
          };

          if (!req.file) {
            return res.status(400).send({ error: 'File is required' });
          }

          const s3Service = new S3(
            getEnvVar('AWS_ACCESS_KEY_ID'),
            getEnvVar('AWS_SECRET_ACCESS_KEY'),
            getEnvVar('AWS_S3_BUCKET_NAME'),
            getEnvVar('AWS_S3_BUCKET_REGION'),
          );

          const file = req.file;
          const fileBuffer = file.buffer;
          const fileName = file.originalname;

          await s3Service.uploadFile(fileBuffer, fileName);
          const fileUrl = await s3Service.getPresignedUrl(fileName);

          const fileModel = await this.ctx.files.create({
            data: {
              filename: fileName,
              path: fileUrl,
            },
          });

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
              file: {
                connect: {
                  id: fileModel.id,
                },
              },
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

  updateProposal() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      validateRequestBody(z.object({})),
      async (_: Request, __: Response, next: NextFunction) => {
        try {
          // const { id } = req.params as unknown as { id: number };
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  deleteProposal() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          await this.ctx.proposals.delete({
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

  getComments() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          const comments = await this.ctx.proposalComments.findMany({
            where: {
              proposalId: parseInt(id),
            },
          });

          res.status(200).send({ data: comments });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  addComment() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(z.object({ text: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          const { text } = req.body as unknown as { text: string };
          const userId = req.currentUserId as number;

          const comment = await this.ctx.proposalComments.create({
            data: {
              text,
              proposal: {
                connect: {
                  id: parseInt(id),
                },
              },
              author: {
                connect: {
                  id: userId,
                },
              },
            },
          });

          res.status(201).send({ data: comment });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  updateComment() {
    return [
      validateRequestParams(z.object({ id: z.string(), commentId: z.string() })),
      validateRequestBody(z.object({ state: z.nativeEnum(ProposalCommentState) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { commentId } = req.params as unknown as { commentId: string };
          const { state } = req.body as unknown as { state: ProposalCommentState };
          const updatedComment = await this.ctx.proposalComments.update({
            where: {
              id: parseInt(commentId),
            },
            data: {
              state,
            },
          });

          res.status(201).send({ data: updatedComment });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  approveProposal() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          await this.ctx.proposals.update({
            where: {
              id: parseInt(id),
            },
            data: {
              state: ProposalState.APPROVED,
            },
          });
          res.status(204).send({ msg: 'Proposal Approved Successfully' });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  rejectProposal() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          await this.ctx.proposals.update({
            where: {
              id: parseInt(id),
            },
            data: {
              state: ProposalState.REJECTED,
            },
          });
          res.status(204).send({ msg: 'Proposal Rejected Successfully' });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createMOU() {
    return [
      // validateRequestParams(z.object({ id: z.number() })),
      // upload.single('file'),
      // async (req: Request, res: Response, next: NextFunction) => {
      //   try {
      //     const { id } = req.params as unknown as { id: number };
      //     if (!req.file) {
      //       return res.status(400).send({ error: 'File not found' });
      //     }
      //   } catch (e) {
      //     console.error(e);
      //     next(new InternalServerError());
      //   }
      // }
    ];
  }

  getMOU() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: number };
          const MOU = await this.ctx.mous.findFirst({
            where: {
              proposalId: id,
            },
          });

          res.status(200).send({ data: MOU });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  approveMOU() {
    return [
      validateRequestParams(z.object({ id: z.number() })),
      // async (req: Request, res: Response, next: NextFunction) => {
      //   try {
      //     const { id } = req.params as unknown as { id: number };
      //   } catch (e) {
      //     console.error(e);
      //     next(new InternalServerError());
      //   }
      // }
    ];
  }
}
