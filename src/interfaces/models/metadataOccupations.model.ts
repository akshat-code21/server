import { MetadataOccupations, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IMetadataOccupationsModel {
  db: IDatabase;

  create(args: Prisma.MetadataOccupationsCreateArgs): Promise<MetadataOccupations>;

  findFirst(args: Prisma.MetadataOccupationsFindFirstArgs): Promise<MetadataOccupations | null>;

  findUnique(args: Prisma.MetadataOccupationsFindUniqueArgs): Promise<MetadataOccupations | null>;

  findMany(args: Prisma.MetadataOccupationsFindManyArgs): Promise<MetadataOccupations[]>;

  update(args: Prisma.MetadataOccupationsUpdateArgs): Promise<MetadataOccupations>;

  updateMany(args: Prisma.MetadataOccupationsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.MetadataOccupationsUpsertArgs): Promise<MetadataOccupations>;

  delete(args: Prisma.MetadataOccupationsDeleteArgs): Promise<MetadataOccupations>;

  deleteMany(args: Prisma.MetadataOccupationsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
