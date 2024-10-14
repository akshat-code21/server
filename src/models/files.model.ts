import { Prisma, Files } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IFilesModel } from 'interfaces/models/files.model';

export default class FilesModel implements IFilesModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.FilesCreateArgs): Promise<Files> {
    return this.db.client.files.create(args);
  }

  async findFirst(args: Prisma.FilesFindFirstArgs): Promise<Files | null> {
    return this.db.client.files.findFirst(args);
  }

  async findUnique(args: Prisma.FilesFindUniqueArgs): Promise<Files | null> {
    return this.db.client.files.findUnique(args);
  }

  async findMany(args: Prisma.FilesFindManyArgs): Promise<Files[]> {
    return this.db.client.files.findMany(args);
  }

  async update(args: Prisma.FilesUpdateArgs): Promise<Files> {
    return this.db.client.files.update(args);
  }

  async updateMany(args: Prisma.FilesUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.files.updateMany(args);
  }

  async upsert(args: Prisma.FilesUpsertArgs): Promise<Files> {
    return this.db.client.files.upsert(args);
  }

  async delete(args: Prisma.FilesDeleteArgs): Promise<Files> {
    return this.db.client.files.delete(args);
  }

  async deleteMany(args: Prisma.FilesDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.files.deleteMany(args);
  }
}
