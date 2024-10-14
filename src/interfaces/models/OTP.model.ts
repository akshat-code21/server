import { OTP, Prisma } from '@prisma/client';
import { IDatabase } from '..';

export interface IOTPModel {
  db: IDatabase;

  create(args: Prisma.OTPCreateArgs): Promise<OTP>;

  findFirst(args: Prisma.OTPFindFirstArgs): Promise<OTP | null>;

  findUnique(args: Prisma.OTPFindUniqueArgs): Promise<OTP | null>;

  findMany(args: Prisma.OTPFindManyArgs): Promise<OTP[]>;

  update(args: Prisma.OTPUpdateArgs): Promise<OTP>;

  updateMany(args: Prisma.OTPUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.OTPUpsertArgs): Promise<OTP>;

  delete(args: Prisma.OTPDeleteArgs): Promise<OTP>;

  deleteMany(args: Prisma.OTPDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
