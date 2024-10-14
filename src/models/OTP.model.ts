import { Prisma, OTP } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IOTPModel } from 'interfaces/models/OTP.model';

export default class OTPModel implements IOTPModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.OTPCreateArgs): Promise<OTP> {
    return this.db.client.oTP.create(args);
  }

  async findFirst(args: Prisma.OTPFindFirstArgs): Promise<OTP | null> {
    return this.db.client.oTP.findFirst(args);
  }

  async findUnique(args: Prisma.OTPFindUniqueArgs): Promise<OTP | null> {
    return this.db.client.oTP.findUnique(args);
  }

  async findMany(args: Prisma.OTPFindManyArgs): Promise<OTP[]> {
    return this.db.client.oTP.findMany(args);
  }

  async update(args: Prisma.OTPUpdateArgs): Promise<OTP> {
    return this.db.client.oTP.update(args);
  }

  async updateMany(args: Prisma.OTPUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.oTP.updateMany(args);
  }

  async upsert(args: Prisma.OTPUpsertArgs): Promise<OTP> {
    return this.db.client.oTP.upsert(args);
  }

  async delete(args: Prisma.OTPDeleteArgs): Promise<OTP> {
    return this.db.client.oTP.delete(args);
  }

  async deleteMany(args: Prisma.OTPDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.oTP.deleteMany(args);
  }
}
