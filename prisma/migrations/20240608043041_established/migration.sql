/*
  Warnings:

  - Changed the type of `estabilished` on the `Institutions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Institutions" DROP COLUMN "estabilished",
ADD COLUMN     "estabilished" TIMESTAMP(3) NOT NULL;
