import { Institutions, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IInstitutionsModel } from 'interfaces/models/institutions.model';

export default class InstitutionsModel implements IInstitutionsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.InstitutionsCreateArgs): Promise<Institutions> {
    return this.db.client.institutions.create(args);
  }

  async findFirst(args: Prisma.InstitutionsFindFirstArgs): Promise<Institutions | null> {
    return this.db.client.institutions.findFirst(args);
  }

  async findUnqiue(args: Prisma.InstitutionsFindUniqueArgs): Promise<Institutions | null> {
    return this.db.client.institutions.findUnique(args);
  }

  async findMany(args: Prisma.InstitutionsFindManyArgs): Promise<Institutions[]> {
    return this.db.client.institutions.findMany(args);
  }

  async update(args: Prisma.InstitutionsUpdateArgs): Promise<Institutions> {
    return this.db.client.institutions.update(args);
  }

  async updateMany(args: Prisma.InstitutionsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.institutions.updateMany(args);
  }

  async upsert(args: Prisma.InstitutionsUpsertArgs): Promise<Institutions> {
    return this.db.client.institutions.upsert(args);
  }

  async delete(args: Prisma.InstitutionsDeleteArgs): Promise<Institutions> {
    return this.db.client.institutions.delete(args);
  }

  async deleteMany(args: Prisma.InstitutionsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.institutions.deleteMany(args);
  }
}
