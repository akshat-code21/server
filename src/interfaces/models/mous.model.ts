import { MoUs, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IMousModel {
  db: IDatabase;

  create(args: Prisma.MoUsCreateArgs): Promise<MoUs>;

  findFirst(args: Prisma.MoUsFindFirstArgs): Promise<MoUs | null>;

  findUnqiue(args: Prisma.MoUsFindUniqueArgs): Promise<MoUs | null>;

  findMany(args: Prisma.MoUsFindManyArgs): Promise<MoUs[]>;

  update(args: Prisma.MoUsUpdateArgs): Promise<MoUs>;

  updateMany(args: Prisma.MoUsUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.MoUsUpsertArgs): Promise<MoUs>;

  delete(args: Prisma.MoUsDeleteArgs): Promise<MoUs>;

  deleteMany(args: Prisma.MoUsDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
