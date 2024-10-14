import { Prisma, UserRoles } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IUserRolesModel } from 'interfaces/models/userRoles.model';

export default class UserRolesModel implements IUserRolesModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.UserRolesCreateArgs): Promise<UserRoles> {
    return this.db.client.userRoles.create(args);
  }

  async findFirst(args: Prisma.UserRolesFindFirstArgs): Promise<UserRoles | null> {
    return this.db.client.userRoles.findFirst(args);
  }

  async findUnique(args: Prisma.UserRolesFindUniqueArgs): Promise<UserRoles | null> {
    return this.db.client.userRoles.findUnique(args);
  }

  async findMany(args: Prisma.UserRolesFindManyArgs): Promise<UserRoles[]> {
    return this.db.client.userRoles.findMany(args);
  }

  async update(args: Prisma.UserRolesUpdateArgs): Promise<UserRoles> {
    return this.db.client.userRoles.update(args);
  }

  async updateMany(args: Prisma.UserRolesUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.userRoles.updateMany(args);
  }

  async upsert(args: Prisma.UserRolesUpsertArgs): Promise<UserRoles> {
    return this.db.client.userRoles.upsert(args);
  }

  async delete(args: Prisma.UserRolesDeleteArgs): Promise<UserRoles> {
    return this.db.client.userRoles.delete(args);
  }

  async deleteMany(args: Prisma.UserRolesDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.userRoles.deleteMany(args);
  }
}
