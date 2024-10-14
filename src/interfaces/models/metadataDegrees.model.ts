import { MetadataDegrees, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IMetadataDegreesModel {
  db: IDatabase;

  create(args: Prisma.MetadataDegreesCreateArgs): Promise<MetadataDegrees>;

  findFirst(args: Prisma.MetadataDegreesFindFirstArgs): Promise<MetadataDegrees | null>;

  findUnique(args: Prisma.MetadataDegreesFindUniqueArgs): Promise<MetadataDegrees | null>;

  findMany(args: Prisma.MetadataDegreesFindManyArgs): Promise<MetadataDegrees[]>;

  update(args: Prisma.MetadataDegreesUpdateArgs): Promise<MetadataDegrees>;

  updateMany(args: Prisma.MetadataDegreesUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.MetadataDegreesUpsertArgs): Promise<MetadataDegrees>;

  delete(args: Prisma.MetadataDegreesDeleteArgs): Promise<MetadataDegrees>;

  deleteMany(args: Prisma.MetadataDegreesDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
