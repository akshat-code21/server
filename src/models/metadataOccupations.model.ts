import { Prisma, MetadataOccupations } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IMetadataOccupationsModel } from 'interfaces/models/metadataOccupations.model';

export default class MetadataOccupationsModel implements IMetadataOccupationsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.MetadataOccupationsCreateArgs): Promise<MetadataOccupations> {
    return this.db.client.metadataOccupations.create(args);
  }

  async findFirst(args: Prisma.MetadataOccupationsFindFirstArgs): Promise<MetadataOccupations | null> {
    return this.db.client.metadataOccupations.findFirst(args);
  }

  async findUnique(args: Prisma.MetadataOccupationsFindUniqueArgs): Promise<MetadataOccupations | null> {
    return this.db.client.metadataOccupations.findUnique(args);
  }

  async findMany(args: Prisma.MetadataOccupationsFindManyArgs): Promise<MetadataOccupations[]> {
    return this.db.client.metadataOccupations.findMany(args);
  }

  async update(args: Prisma.MetadataOccupationsUpdateArgs): Promise<MetadataOccupations> {
    return this.db.client.metadataOccupations.update(args);
  }

  async updateMany(args: Prisma.MetadataOccupationsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.metadataOccupations.updateMany(args);
  }

  async upsert(args: Prisma.MetadataOccupationsUpsertArgs): Promise<MetadataOccupations> {
    return this.db.client.metadataOccupations.upsert(args);
  }

  async delete(args: Prisma.MetadataOccupationsDeleteArgs): Promise<MetadataOccupations> {
    return this.db.client.metadataOccupations.delete(args);
  }

  async deleteMany(args: Prisma.MetadataOccupationsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.metadataOccupations.deleteMany(args);
  }
}
