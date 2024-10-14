import { InstitutionContributors, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IInstitutionContributorsModel } from 'interfaces/models/institutionContributors.model';

export default class InstitutionContributorsModel implements IInstitutionContributorsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.InstitutionContributorsCreateArgs): Promise<InstitutionContributors> {
    return this.db.client.institutionContributors.create(args);
  }

  async findFirst(args: Prisma.InstitutionContributorsFindFirstArgs): Promise<InstitutionContributors | null> {
    return this.db.client.institutionContributors.findFirst(args);
  }

  async findUnqiue(args: Prisma.InstitutionContributorsFindUniqueArgs): Promise<InstitutionContributors | null> {
    return this.db.client.institutionContributors.findUnique(args);
  }

  async findMany(args: Prisma.InstitutionContributorsFindManyArgs): Promise<InstitutionContributors[]> {
    return this.db.client.institutionContributors.findMany(args);
  }

  async update(args: Prisma.InstitutionContributorsUpdateArgs): Promise<InstitutionContributors> {
    return this.db.client.institutionContributors.update(args);
  }

  async updateMany(args: Prisma.InstitutionContributorsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.institutionContributors.updateMany(args);
  }

  async upsert(args: Prisma.InstitutionContributorsUpsertArgs): Promise<InstitutionContributors> {
    return this.db.client.institutionContributors.upsert(args);
  }

  async delete(args: Prisma.InstitutionContributorsDeleteArgs): Promise<InstitutionContributors> {
    return this.db.client.institutionContributors.delete(args);
  }

  async deleteMany(args: Prisma.InstitutionContributorsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.institutionContributors.deleteMany(args);
  }
}
