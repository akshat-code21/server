import { Proposals, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IProposalsModel {
  db: IDatabase;

  create(args: Prisma.ProposalsCreateArgs): Promise<Proposals>;

  findFirst(args: Prisma.ProposalsFindFirstArgs): Promise<Proposals | null>;

  findUnqiue(args: Prisma.ProposalsFindUniqueArgs): Promise<Proposals | null>;

  findMany(args: Prisma.ProposalsFindManyArgs): Promise<Proposals[]>;

  update(args: Prisma.ProposalsUpdateArgs): Promise<Proposals>;

  updateMany(args: Prisma.ProposalsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ProposalsUpsertArgs): Promise<Proposals>;

  delete(args: Prisma.ProposalsDeleteArgs): Promise<Proposals>;

  deleteMany(args: Prisma.ProposalsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
