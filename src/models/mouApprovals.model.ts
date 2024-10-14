import { MoUApprovals, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IMouApprovalsModel } from 'interfaces/models/mouApprovals.model';

export default class MouApprovalsModel implements IMouApprovalsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.MoUApprovalsCreateArgs): Promise<MoUApprovals> {
    return this.db.client.moUApprovals.create(args);
  }

  async findFirst(args: Prisma.MoUApprovalsFindFirstArgs): Promise<MoUApprovals | null> {
    return this.db.client.moUApprovals.findFirst(args);
  }

  async findUnqiue(args: Prisma.MoUApprovalsFindUniqueArgs): Promise<MoUApprovals | null> {
    return this.db.client.moUApprovals.findUnique(args);
  }

  async findMany(args: Prisma.MoUApprovalsFindManyArgs): Promise<MoUApprovals[]> {
    return this.db.client.moUApprovals.findMany(args);
  }

  async update(args: Prisma.MoUApprovalsUpdateArgs): Promise<MoUApprovals> {
    return this.db.client.moUApprovals.update(args);
  }

  async updateMany(args: Prisma.MoUApprovalsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.moUApprovals.updateMany(args);
  }

  async upsert(args: Prisma.MoUApprovalsUpsertArgs): Promise<MoUApprovals> {
    return this.db.client.moUApprovals.upsert(args);
  }

  async delete(args: Prisma.MoUApprovalsDeleteArgs): Promise<MoUApprovals> {
    return this.db.client.moUApprovals.delete(args);
  }

  async deleteMany(args: Prisma.MoUApprovalsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.moUApprovals.deleteMany(args);
  }
}
