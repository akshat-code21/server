import { ProposalComment, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IProposalCommentModel {
  db: IDatabase;

  create(args: Prisma.ProposalCommentCreateArgs): Promise<ProposalComment>;

  findFirst(args: Prisma.ProposalCommentFindFirstArgs): Promise<ProposalComment | null>;

  findUnqiue(args: Prisma.ProposalCommentFindUniqueArgs): Promise<ProposalComment | null>;

  findMany(args: Prisma.ProposalCommentFindManyArgs): Promise<ProposalComment[]>;

  update(args: Prisma.ProposalCommentUpdateArgs): Promise<ProposalComment>;

  updateMany(args: Prisma.ProposalCommentUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ProposalCommentUpsertArgs): Promise<ProposalComment>;

  delete(args: Prisma.ProposalCommentDeleteArgs): Promise<ProposalComment>;

  deleteMany(args: Prisma.ProposalCommentDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
