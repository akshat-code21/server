-- DropForeignKey
ALTER TABLE "Proposals" DROP CONSTRAINT "Proposals_projectId_fkey";

-- AlterTable
ALTER TABLE "Proposals" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
