/*
  Warnings:

  - You are about to drop the column `usersId` on the `MoUApprovals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[no_objection_certification_fileId]` on the table `InstitutionContributors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[proof_of_enrolment_fileId]` on the table `InstitutionContributors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no_objection_certification_fileId` to the `InstitutionContributors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proof_of_enrolment_fileId` to the `InstitutionContributors` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserRoles_roleId_key";

-- AlterTable
ALTER TABLE "InstitutionContributors" ADD COLUMN     "no_objection_certification_fileId" INTEGER NOT NULL,
ADD COLUMN     "proof_of_enrolment_fileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MoUApprovals" DROP COLUMN "usersId";

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionContributors_no_objection_certification_fileId_key" ON "InstitutionContributors"("no_objection_certification_fileId");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionContributors_proof_of_enrolment_fileId_key" ON "InstitutionContributors"("proof_of_enrolment_fileId");

-- AddForeignKey
ALTER TABLE "InstitutionContributors" ADD CONSTRAINT "InstitutionContributors_no_objection_certification_fileId_fkey" FOREIGN KEY ("no_objection_certification_fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionContributors" ADD CONSTRAINT "InstitutionContributors_proof_of_enrolment_fileId_fkey" FOREIGN KEY ("proof_of_enrolment_fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
