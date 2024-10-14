import { Prisma, Projects } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IProjectsModel } from 'interfaces/models/projects.model';

export default class ProjectsModel implements IProjectsModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.ProjectsCreateArgs): Promise<Projects> {
    return this.db.client.projects.create(args);
  }

  async findFirst(args: Prisma.ProjectsFindFirstArgs): Promise<Projects | null> {
    return this.db.client.projects.findFirst(args);
  }

  async findUnqiue(args: Prisma.ProjectsFindUniqueArgs): Promise<Projects | null> {
    return this.db.client.projects.findUnique(args);
  }

  async findMany(args: Prisma.ProjectsFindManyArgs): Promise<Projects[]> {
    return this.db.client.projects.findMany(args);
  }

  async update(args: Prisma.ProjectsUpdateArgs): Promise<Projects> {
    return this.db.client.projects.update(args);
  }

  async updateMany(args: Prisma.ProjectsUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.projects.updateMany(args);
  }

  async upsert(args: Prisma.ProjectsUpsertArgs): Promise<Projects> {
    return this.db.client.projects.upsert(args);
  }

  async delete(args: Prisma.ProjectsDeleteArgs): Promise<Projects> {
    return this.db.client.projects.delete(args);
  }

  async deleteMany(args: Prisma.ProjectsDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.projects.deleteMany(args);
  }
}
