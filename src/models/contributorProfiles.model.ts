import { Prisma, ContributorProfiles } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IContributorProfilesModel } from 'interfaces/models/contributorProfiles.model';

export default class ContributorProfilesModel implements IContributorProfilesModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ContributorProfilesCreateArgs): Promise<ContributorProfiles> {
    return this.db.client.contributorProfiles.create(args);
  }

  async findFirst(args: Prisma.ContributorProfilesFindFirstArgs): Promise<ContributorProfiles | null> {
    return this.db.client.contributorProfiles.findFirst(args);
  }

  async findUnique(args: Prisma.ContributorProfilesFindUniqueArgs): Promise<ContributorProfiles | null> {
    return this.db.client.contributorProfiles.findUnique(args);
  }

  async findMany(args: Prisma.ContributorProfilesFindManyArgs): Promise<ContributorProfiles[]> {
    return this.db.client.contributorProfiles.findMany(args);
  }

  async update(args: Prisma.ContributorProfilesUpdateArgs): Promise<ContributorProfiles> {
    return this.db.client.contributorProfiles.update(args);
  }

  async updateMany(args: Prisma.ContributorProfilesUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.contributorProfiles.updateMany(args);
  }

  async upsert(args: Prisma.ContributorProfilesUpsertArgs): Promise<ContributorProfiles> {
    return this.db.client.contributorProfiles.upsert(args);
  }

  async delete(args: Prisma.ContributorProfilesDeleteArgs): Promise<ContributorProfiles> {
    return this.db.client.contributorProfiles.delete(args);
  }

  async deleteMany(args: Prisma.ContributorProfilesDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.contributorProfiles.deleteMany(args);
  }
}
