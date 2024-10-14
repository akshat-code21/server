import { Files, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IFilesModel {
  db: IDatabase;

  create(args: Prisma.FilesCreateArgs): Promise<Files>;

  findFirst(args: Prisma.FilesFindFirstArgs): Promise<Files | null>;

  findUnique(args: Prisma.FilesFindUniqueArgs): Promise<Files | null>;

  findMany(args: Prisma.FilesFindManyArgs): Promise<Files[]>;

  update(args: Prisma.FilesUpdateArgs): Promise<Files>;

  updateMany(args: Prisma.FilesUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.FilesUpsertArgs): Promise<Files>;

  delete(args: Prisma.FilesDeleteArgs): Promise<Files>;

  deleteMany(args: Prisma.FilesDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
