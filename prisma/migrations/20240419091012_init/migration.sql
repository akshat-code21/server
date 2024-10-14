-- CreateEnum
CREATE TYPE "ProposalState" AS ENUM ('INCOMPLETE', 'CHANGES_REQUESTED', 'REVIEW_REQUESTED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProposalCommentState" AS ENUM ('PENDING', 'RESOLVED');

-- CreateEnum
CREATE TYPE "MoUState" AS ENUM ('PENDING', 'SIGNED_BY_CONTRIBUTOR', 'SIGNED_BY_ADMIN', 'SIGNED_BY_BOTH');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('NEW', 'PROPOSED');

-- CreateEnum
CREATE TYPE "ContributorType" AS ENUM ('INDIVIDUAL', 'INSTITUION');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributorProfiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "occupation" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "aadhar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "contributionDuration" INTEGER NOT NULL,
    "type" "ContributorType" NOT NULL DEFAULT 'INSTITUION',

    CONSTRAINT "ContributorProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionContributors" (
    "id" SERIAL NOT NULL,
    "contributorProfileId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "InstitutionContributors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institutions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "estabilished" INTEGER NOT NULL,

    CONSTRAINT "Institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "description" TEXT NOT NULL,
    "proposedById" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposals" (
    "id" SERIAL NOT NULL,
    "details" TEXT NOT NULL,
    "resources" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "state" "ProposalState" NOT NULL DEFAULT 'INCOMPLETE',
    "projectId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "Proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalComment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" "ProposalCommentState" NOT NULL DEFAULT 'PENDING',
    "authorId" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "ProposalComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoUs" (
    "id" SERIAL NOT NULL,
    "uploadedById" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,
    "fileId" INTEGER,

    CONSTRAINT "MoUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoUApprovals" (
    "id" SERIAL NOT NULL,
    "contributorId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "MoUId" INTEGER NOT NULL,
    "usersId" INTEGER,

    CONSTRAINT "MoUApprovals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "institutionsId" INTEGER,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Educations" (
    "id" SERIAL NOT NULL,
    "university" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "contributorProfileId" INTEGER NOT NULL,

    CONSTRAINT "Educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetadataUniversities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetadataUniversities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetadataDegrees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetadataDegrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetadataOccupations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetadataOccupations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContributorProfiles_userId_key" ON "ContributorProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionContributors_contributorProfileId_key" ON "InstitutionContributors"("contributorProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposals_fileId_key" ON "Proposals"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "MoUs_proposalId_key" ON "MoUs"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "MoUs_fileId_key" ON "MoUs"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "MoUApprovals_MoUId_key" ON "MoUApprovals"("MoUId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_userId_key" ON "UserRoles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_roleId_key" ON "UserRoles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Educations_contributorProfileId_key" ON "Educations"("contributorProfileId");

-- AddForeignKey
ALTER TABLE "ContributorProfiles" ADD CONSTRAINT "ContributorProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionContributors" ADD CONSTRAINT "InstitutionContributors_contributorProfileId_fkey" FOREIGN KEY ("contributorProfileId") REFERENCES "ContributorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionContributors" ADD CONSTRAINT "InstitutionContributors_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_proposedById_fkey" FOREIGN KEY ("proposedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalComment" ADD CONSTRAINT "ProposalComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalComment" ADD CONSTRAINT "ProposalComment_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoUs" ADD CONSTRAINT "MoUs_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoUs" ADD CONSTRAINT "MoUs_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoUs" ADD CONSTRAINT "MoUs_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoUApprovals" ADD CONSTRAINT "MoUApprovals_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoUApprovals" ADD CONSTRAINT "MoUApprovals_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoUApprovals" ADD CONSTRAINT "MoUApprovals_MoUId_fkey" FOREIGN KEY ("MoUId") REFERENCES "MoUs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_institutionsId_fkey" FOREIGN KEY ("institutionsId") REFERENCES "Institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Educations" ADD CONSTRAINT "Educations_contributorProfileId_fkey" FOREIGN KEY ("contributorProfileId") REFERENCES "ContributorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
