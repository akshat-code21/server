import { Prisma, Proposals } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IProposalsModel } from 'interfaces/models/proposals.model';

export default class ProposalsModel implements IProposalsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ProposalsCreateArgs): Promise<Proposals> {
    return this.db.client.proposals.create(args);
  }

  async findFirst(args: Prisma.ProposalsFindFirstArgs): Promise<Proposals | null> {
    return this.db.client.proposals.findFirst(args);
  }

  async findUnqiue(args: Prisma.ProposalsFindUniqueArgs): Promise<Proposals | null> {
    return this.db.client.proposals.findUnique(args);
  }

  async findMany(args: Prisma.ProposalsFindManyArgs): Promise<Proposals[]> {
    return this.db.client.proposals.findMany(args);
  }

  async update(args: Prisma.ProposalsUpdateArgs): Promise<Proposals> {
    return this.db.client.proposals.update(args);
  }

  async updateMany(args: Prisma.ProposalsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.proposals.updateMany(args);
  }

  async upsert(args: Prisma.ProposalsUpsertArgs): Promise<Proposals> {
    return this.db.client.proposals.upsert(args);
  }

  async delete(args: Prisma.ProposalsDeleteArgs): Promise<Proposals> {
    return this.db.client.proposals.delete(args);
  }

  async deleteMany(args: Prisma.ProposalsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.proposals.deleteMany(args);
  }
}
