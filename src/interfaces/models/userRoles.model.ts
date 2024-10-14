import { UserRoles, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IUserRolesModel {
  db: IDatabase;

  create(args: Prisma.UserRolesCreateArgs): Promise<UserRoles>;

  findFirst(args: Prisma.UserRolesFindFirstArgs): Promise<UserRoles | null>;

  findUnique(args: Prisma.UserRolesFindUniqueArgs): Promise<UserRoles | null>;

  findMany(args: Prisma.UserRolesFindManyArgs): Promise<UserRoles[]>;

  update(args: Prisma.UserRolesUpdateArgs): Promise<UserRoles>;

  updateMany(args: Prisma.UserRolesUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.UserRolesUpsertArgs): Promise<UserRoles>;

  delete(args: Prisma.UserRolesDeleteArgs): Promise<UserRoles>;

  deleteMany(args: Prisma.UserRolesDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
