import { MetadataUniversities, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IMetadataUniversitiesModel {
  db: IDatabase;

  create(args: Prisma.MetadataUniversitiesCreateArgs): Promise<MetadataUniversities>;

  findFirst(args: Prisma.MetadataUniversitiesFindFirstArgs): Promise<MetadataUniversities | null>;

  findUnique(args: Prisma.MetadataUniversitiesFindUniqueArgs): Promise<MetadataUniversities | null>;

  findMany(args: Prisma.MetadataUniversitiesFindManyArgs): Promise<MetadataUniversities[]>;

  update(args: Prisma.MetadataUniversitiesUpdateArgs): Promise<MetadataUniversities>;

  updateMany(args: Prisma.MetadataUniversitiesUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.MetadataUniversitiesUpsertArgs): Promise<MetadataUniversities>;

  delete(args: Prisma.MetadataUniversitiesDeleteArgs): Promise<MetadataUniversities>;

  deleteMany(args: Prisma.MetadataUniversitiesDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
