import { Prisma, PrismaClient } from '@prisma/client';
import { IMousModel } from './models/mous.model';
import { IUserModel } from './models/user.model';
import { IProjectsModel } from './models/projects.model';
import { IInstitutionsModel } from './models/institutions.model';
import { IMouApprovalsModel } from './models/mouApprovals.model';
import { IFilesModel } from './models/files.model';
import { IProposalsModel } from './models/proposals.model';
import { IProposalCommentModel } from './models/proposalComment.model';
import { IRolesModel } from './models/roles.model';
import { IUserRolesModel } from './models/userRoles.model';
import { IEducationsModel } from './models/educations.model';
import { IContributorProfilesModel } from './models/contributorProfiles.model';
import { IMetadataDegreesModel } from './models/metadataDegrees.model';
import { IMetadataOccupationsModel } from './models/metadataOccupations.model';
import { IMetadataUniversitiesModel } from './models/metadataUniversities.model';
import { IInstitutionContributorsModel } from './models/institutionContributors.model';
import { IOTPModel } from './models/OTP.model';

export type txClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export interface IDatabase {
  client: PrismaClient | txClient;
}

export interface IContext {
  db: IDatabase;
  users: IUserModel;
  mous: IMousModel;
  mouApprovals: IMouApprovalsModel;
  institutions: IInstitutionsModel;
  institutionContributors: IInstitutionContributorsModel;
  projects: IProjectsModel;
  files: IFilesModel;
  proposals: IProposalsModel;
  proposalComments: IProposalCommentModel;
  roles: IRolesModel;
  userRoles: IUserRolesModel;
  educations: IEducationsModel;
  contributorProfiles: IContributorProfilesModel;
  metadataDegrees: IMetadataDegreesModel;
  metadataUniversities: IMetadataUniversitiesModel;
  metadataOccupations: IMetadataOccupationsModel;
  OTP: IOTPModel;
}
