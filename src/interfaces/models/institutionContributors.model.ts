import { InstitutionContributors, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IInstitutionContributorsModel {
  db: IDatabase;

  create(args: Prisma.InstitutionContributorsCreateArgs): Promise<InstitutionContributors>;

  findFirst(args: Prisma.InstitutionContributorsFindFirstArgs): Promise<InstitutionContributors | null>;

  findUnqiue(args: Prisma.InstitutionContributorsFindUniqueArgs): Promise<InstitutionContributors | null>;

  findMany(args: Prisma.InstitutionContributorsFindManyArgs): Promise<InstitutionContributors[]>;

  update(args: Prisma.InstitutionContributorsUpdateArgs): Promise<InstitutionContributors>;

  updateMany(args: Prisma.InstitutionContributorsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.InstitutionContributorsUpsertArgs): Promise<InstitutionContributors>;

  delete(args: Prisma.InstitutionContributorsDeleteArgs): Promise<InstitutionContributors>;

  deleteMany(args: Prisma.InstitutionContributorsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
