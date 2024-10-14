import { Projects, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IProjectsModel {
  db: IDatabase;

  create(args: Prisma.ProjectsCreateArgs): Promise<Projects>;

  findFirst(args: Prisma.ProjectsFindFirstArgs): Promise<Projects | null>;

  findUnqiue(args: Prisma.ProjectsFindUniqueArgs): Promise<Projects | null>;

  findMany(args: Prisma.ProjectsFindManyArgs): Promise<Projects[]>;

  update(args: Prisma.ProjectsUpdateArgs): Promise<Projects>;

  updateMany(args: Prisma.ProjectsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.ProjectsUpsertArgs): Promise<Projects>;

  delete(args: Prisma.ProjectsDeleteArgs): Promise<Projects>;

  deleteMany(args: Prisma.ProjectsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
