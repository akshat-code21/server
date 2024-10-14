import { Prisma, Roles } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IRolesModel } from 'interfaces/models/roles.model';

export default class RolesModel implements IRolesModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.RolesCreateArgs): Promise<Roles> {
    return this.db.client.roles.create(args);
  }

  async findFirst(args: Prisma.RolesFindFirstArgs): Promise<Roles | null> {
    return this.db.client.roles.findFirst(args);
  }

  async findUnique(args: Prisma.RolesFindUniqueArgs): Promise<Roles | null> {
    return this.db.client.roles.findUnique(args);
  }

  async findMany(args: Prisma.RolesFindManyArgs): Promise<Roles[]> {
    return this.db.client.roles.findMany(args);
  }

  async update(args: Prisma.RolesUpdateArgs): Promise<Roles> {
    return this.db.client.roles.update(args);
  }

  async updateMany(args: Prisma.RolesUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.roles.updateMany(args);
  }

  async upsert(args: Prisma.RolesUpsertArgs): Promise<Roles> {
    return this.db.client.roles.upsert(args);
  }

  async delete(args: Prisma.RolesDeleteArgs): Promise<Roles> {
    return this.db.client.roles.delete(args);
  }

  async deleteMany(args: Prisma.RolesDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.roles.deleteMany(args);
  }
}
