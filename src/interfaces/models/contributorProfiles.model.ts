import { ContributorProfiles, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IContributorProfilesModel {
  db: IDatabase;

  create(args: Prisma.ContributorProfilesCreateArgs): Promise<ContributorProfiles>;

  findFirst(args: Prisma.ContributorProfilesFindFirstArgs): Promise<ContributorProfiles | null>;

  findUnique(args: Prisma.ContributorProfilesFindUniqueArgs): Promise<ContributorProfiles | null>;

  findMany(args: Prisma.ContributorProfilesFindManyArgs): Promise<ContributorProfiles[]>;

  update(args: Prisma.ContributorProfilesUpdateArgs): Promise<ContributorProfiles>;

  updateMany(args: Prisma.ContributorProfilesUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ContributorProfilesUpsertArgs): Promise<ContributorProfiles>;

  delete(args: Prisma.ContributorProfilesDeleteArgs): Promise<ContributorProfiles>;

  deleteMany(args: Prisma.ContributorProfilesDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
