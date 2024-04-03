/*
  Warnings:

  - You are about to drop the column `pleton_mahasiswa` on the `Mahasiswa` table. All the data in the column will be lost.
  - Added the required column `pletonid` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_pleton_mahasiswa_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "pleton_mahasiswa",
ADD COLUMN     "pletonid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_pletonid_fkey" FOREIGN KEY ("pletonid") REFERENCES "Pleton"("pletonid") ON DELETE RESTRICT ON UPDATE CASCADE;
