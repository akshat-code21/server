import { Educations, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IEducationsModel {
  db: IDatabase;

  create(args: Prisma.EducationsCreateArgs): Promise<Educations>;

  findFirst(args: Prisma.EducationsFindFirstArgs): Promise<Educations | null>;

  findUnique(args: Prisma.EducationsFindUniqueArgs): Promise<Educations | null>;

  findMany(args: Prisma.EducationsFindManyArgs): Promise<Educations[]>;

  update(args: Prisma.EducationsUpdateArgs): Promise<Educations>;

  updateMany(args: Prisma.EducationsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EducationsUpsertArgs): Promise<Educations>;

  delete(args: Prisma.EducationsDeleteArgs): Promise<Educations>;

  deleteMany(args: Prisma.EducationsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
