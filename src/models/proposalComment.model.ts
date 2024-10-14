import { Prisma, ProposalComment } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IProposalCommentModel } from 'interfaces/models/proposalComment.model';

export default class ProposalCommentModel implements IProposalCommentModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ProposalCommentCreateArgs): Promise<ProposalComment> {
    return this.db.client.proposalComment.create(args);
  }

  async findFirst(args: Prisma.ProposalCommentFindFirstArgs): Promise<ProposalComment | null> {
    return this.db.client.proposalComment.findFirst(args);
  }

  async findUnqiue(args: Prisma.ProposalCommentFindUniqueArgs): Promise<ProposalComment | null> {
    return this.db.client.proposalComment.findUnique(args);
  }

  async findMany(args: Prisma.ProposalCommentFindManyArgs): Promise<ProposalComment[]> {
    return this.db.client.proposalComment.findMany(args);
  }

  async update(args: Prisma.ProposalCommentUpdateArgs): Promise<ProposalComment> {
    return this.db.client.proposalComment.update(args);
  }

  async updateMany(args: Prisma.ProposalCommentUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.proposalComment.updateMany(args);
  }

  async upsert(args: Prisma.ProposalCommentUpsertArgs): Promise<ProposalComment> {
    return this.db.client.proposalComment.upsert(args);
  }

  async delete(args: Prisma.ProposalCommentDeleteArgs): Promise<ProposalComment> {
    return this.db.client.proposalComment.delete(args);
  }

  async deleteMany(args: Prisma.ProposalCommentDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.proposalComment.deleteMany(args);
  }
}
