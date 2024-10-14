import { Roles, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IRolesModel {
  db: IDatabase;

  create(args: Prisma.RolesCreateArgs): Promise<Roles>;

  findFirst(args: Prisma.RolesFindFirstArgs): Promise<Roles | null>;

  findUnique(args: Prisma.RolesFindUniqueArgs): Promise<Roles | null>;

  findMany(args: Prisma.RolesFindManyArgs): Promise<Roles[]>;

  update(args: Prisma.RolesUpdateArgs): Promise<Roles>;

  updateMany(args: Prisma.RolesUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.RolesUpsertArgs): Promise<Roles>;

  delete(args: Prisma.RolesDeleteArgs): Promise<Roles>;

  deleteMany(args: Prisma.RolesDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
