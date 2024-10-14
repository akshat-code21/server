import { Prisma, Users } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IUserModel {
  db: IDatabase;
  create(args: Prisma.UsersCreateArgs): Promise<Users>;

  findFirst(args: Prisma.UsersFindFirstArgs): Promise<Users | null>;

  findUnqiue(args: Prisma.UsersFindUniqueArgs): Promise<Users | null>;

  findMany(args: Prisma.UsersFindManyArgs): Promise<Users[]>;

  update(args: Prisma.UsersUpdateArgs): Promise<Users>;

  updateMany(args: Prisma.UsersUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.UsersUpsertArgs): Promise<Users>;

  delete(args: Prisma.UsersDeleteArgs): Promise<Users>;

  deleteMany(args: Prisma.UsersDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
