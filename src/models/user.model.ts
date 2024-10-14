import { Prisma, Users } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IUserModel } from 'interfaces/models/user.model';

export default class UserModel implements IUserModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.UsersCreateArgs): Promise<Users> {
    return this.db.client.users.create(args);
  }

  async findFirst(args: Prisma.UsersFindFirstArgs): Promise<Users | null> {
    return this.db.client.users.findFirst(args);
  }

  async findUnqiue(args: Prisma.UsersFindUniqueArgs): Promise<Users | null> {
    return this.db.client.users.findUnique(args);
  }

  async findMany(args: Prisma.UsersFindManyArgs): Promise<Users[]> {
    return this.db.client.users.findMany(args);
  }

  async update(args: Prisma.UsersUpdateArgs): Promise<Users> {
    return this.db.client.users.update(args);
  }

  async updateMany(args: Prisma.UsersUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.users.updateMany(args);
  }

  async upsert(args: Prisma.UsersUpsertArgs): Promise<Users> {
    return this.db.client.users.upsert(args);
  }

  async delete(args: Prisma.UsersDeleteArgs): Promise<Users> {
    return this.db.client.users.delete(args);
  }

  async deleteMany(args: Prisma.UsersDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.users.deleteMany(args);
  }
}
