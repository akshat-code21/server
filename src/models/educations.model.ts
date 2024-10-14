import { Prisma, Educations } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEducationsModel } from 'interfaces/models/educations.model';

export default class EducationsModel implements IEducationsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EducationsCreateArgs): Promise<Educations> {
    return this.db.client.educations.create(args);
  }

  async findFirst(args: Prisma.EducationsFindFirstArgs): Promise<Educations | null> {
    return this.db.client.educations.findFirst(args);
  }

  async findUnique(args: Prisma.EducationsFindUniqueArgs): Promise<Educations | null> {
    return this.db.client.educations.findUnique(args);
  }

  async findMany(args: Prisma.EducationsFindManyArgs): Promise<Educations[]> {
    return this.db.client.educations.findMany(args);
  }

  async update(args: Prisma.EducationsUpdateArgs): Promise<Educations> {
    return this.db.client.educations.update(args);
  }

  async updateMany(args: Prisma.EducationsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.educations.updateMany(args);
  }

  async upsert(args: Prisma.EducationsUpsertArgs): Promise<Educations> {
    return this.db.client.educations.upsert(args);
  }

  async delete(args: Prisma.EducationsDeleteArgs): Promise<Educations> {
    return this.db.client.educations.delete(args);
  }

  async deleteMany(args: Prisma.EducationsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.educations.deleteMany(args);
  }
}
