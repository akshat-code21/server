import { Prisma, MetadataUniversities } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IMetadataUniversitiesModel } from 'interfaces/models/metadataUniversities.model';

export default class MetadataUniversitiesModel implements IMetadataUniversitiesModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.MetadataUniversitiesCreateArgs): Promise<MetadataUniversities> {
    return this.db.client.metadataUniversities.create(args);
  }

  async findFirst(args: Prisma.MetadataUniversitiesFindFirstArgs): Promise<MetadataUniversities | null> {
    return this.db.client.metadataUniversities.findFirst(args);
  }

  async findUnique(args: Prisma.MetadataUniversitiesFindUniqueArgs): Promise<MetadataUniversities | null> {
    return this.db.client.metadataUniversities.findUnique(args);
  }

  async findMany(args: Prisma.MetadataUniversitiesFindManyArgs): Promise<MetadataUniversities[]> {
    return this.db.client.metadataUniversities.findMany(args);
  }

  async update(args: Prisma.MetadataUniversitiesUpdateArgs): Promise<MetadataUniversities> {
    return this.db.client.metadataUniversities.update(args);
  }

  async updateMany(args: Prisma.MetadataUniversitiesUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.metadataUniversities.updateMany(args);
  }

  async upsert(args: Prisma.MetadataUniversitiesUpsertArgs): Promise<MetadataUniversities> {
    return this.db.client.metadataUniversities.upsert(args);
  }

  async delete(args: Prisma.MetadataUniversitiesDeleteArgs): Promise<MetadataUniversities> {
    return this.db.client.metadataUniversities.delete(args);
  }

  async deleteMany(args: Prisma.MetadataUniversitiesDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.metadataUniversities.deleteMany(args);
  }
}
