import { Institutions, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IInstitutionsModel {
  db: IDatabase;

  create(args: Prisma.InstitutionsCreateArgs): Promise<Institutions>;

  findFirst(args: Prisma.InstitutionsFindFirstArgs): Promise<Institutions | null>;

  findUnqiue(args: Prisma.InstitutionsFindUniqueArgs): Promise<Institutions | null>;

  findMany(args: Prisma.InstitutionsFindManyArgs): Promise<Institutions[]>;

  update(args: Prisma.InstitutionsUpdateArgs): Promise<Institutions>;

  updateMany(args: Prisma.InstitutionsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.InstitutionsUpsertArgs): Promise<Institutions>;

  delete(args: Prisma.InstitutionsDeleteArgs): Promise<Institutions>;

  deleteMany(args: Prisma.InstitutionsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
