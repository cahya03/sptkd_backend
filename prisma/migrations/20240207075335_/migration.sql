/*
  Warnings:

  - You are about to drop the column `pletonid` on the `Mahasiswa` table. All the data in the column will be lost.
  - Added the required column `pleton_mahasiswa` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_pletonid_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "pletonid",
ADD COLUMN     "pleton_mahasiswa" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_pleton_mahasiswa_fkey" FOREIGN KEY ("pleton_mahasiswa") REFERENCES "Pleton"("pletonid") ON DELETE RESTRICT ON UPDATE CASCADE;
