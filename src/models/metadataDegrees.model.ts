import { Prisma, MetadataDegrees } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IMetadataDegreesModel } from 'interfaces/models/metadataDegrees.model';

export default class MetadataDegreesModel implements IMetadataDegreesModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.MetadataDegreesCreateArgs): Promise<MetadataDegrees> {
    return this.db.client.metadataDegrees.create(args);
  }

  async findFirst(args: Prisma.MetadataDegreesFindFirstArgs): Promise<MetadataDegrees | null> {
    return this.db.client.metadataDegrees.findFirst(args);
  }

  async findUnique(args: Prisma.MetadataDegreesFindUniqueArgs): Promise<MetadataDegrees | null> {
    return this.db.client.metadataDegrees.findUnique(args);
  }

  async findMany(args: Prisma.MetadataDegreesFindManyArgs): Promise<MetadataDegrees[]> {
    return this.db.client.metadataDegrees.findMany(args);
  }

  async update(args: Prisma.MetadataDegreesUpdateArgs): Promise<MetadataDegrees> {
    return this.db.client.metadataDegrees.update(args);
  }

  async updateMany(args: Prisma.MetadataDegreesUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.metadataDegrees.updateMany(args);
  }

  async upsert(args: Prisma.MetadataDegreesUpsertArgs): Promise<MetadataDegrees> {
    return this.db.client.metadataDegrees.upsert(args);
  }

  async delete(args: Prisma.MetadataDegreesDeleteArgs): Promise<MetadataDegrees> {
    return this.db.client.metadataDegrees.delete(args);
  }

  async deleteMany(args: Prisma.MetadataDegreesDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.metadataDegrees.deleteMany(args);
  }
}
