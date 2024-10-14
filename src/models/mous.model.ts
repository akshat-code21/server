import { MoUs, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IMousModel } from 'interfaces/models/mous.model';

export default class MousModel implements IMousModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.MoUsCreateArgs): Promise<MoUs> {
    return this.db.client.moUs.create(args);
  }

  async findFirst(args: Prisma.MoUsFindFirstArgs): Promise<MoUs | null> {
    return this.db.client.moUs.findFirst(args);
  }

  async findUnqiue(args: Prisma.MoUsFindUniqueArgs): Promise<MoUs | null> {
    return this.db.client.moUs.findUnique(args);
  }

  async findMany(args: Prisma.MoUsFindManyArgs): Promise<MoUs[]> {
    return this.db.client.moUs.findMany(args);
  }

  async update(args: Prisma.MoUsUpdateArgs): Promise<MoUs> {
    return this.db.client.moUs.update(args);
  }

  async updateMany(args: Prisma.MoUsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.moUs.updateMany(args);
  }

  async upsert(args: Prisma.MoUsUpsertArgs): Promise<MoUs> {
    return this.db.client.moUs.upsert(args);
  }

  async delete(args: Prisma.MoUsDeleteArgs): Promise<MoUs> {
    return this.db.client.moUs.delete(args);
  }

  async deleteMany(args: Prisma.MoUsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.moUs.deleteMany(args);
  }
}
