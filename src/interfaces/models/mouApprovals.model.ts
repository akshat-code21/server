import { MoUApprovals, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IMouApprovalsModel {
  db: IDatabase;

  create(args: Prisma.MoUApprovalsCreateArgs): Promise<MoUApprovals>;

  findFirst(args: Prisma.MoUApprovalsFindFirstArgs): Promise<MoUApprovals | null>;

  findUnqiue(args: Prisma.MoUApprovalsFindUniqueArgs): Promise<MoUApprovals | null>;

  findMany(args: Prisma.MoUApprovalsFindManyArgs): Promise<MoUApprovals[]>;

  update(args: Prisma.MoUApprovalsUpdateArgs): Promise<MoUApprovals>;

  updateMany(args: Prisma.MoUApprovalsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.MoUApprovalsUpsertArgs): Promise<MoUApprovals>;

  delete(args: Prisma.MoUApprovalsDeleteArgs): Promise<MoUApprovals>;

  deleteMany(args: Prisma.MoUApprovalsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
