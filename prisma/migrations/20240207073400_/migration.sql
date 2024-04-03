/*
  Warnings:

  - You are about to drop the column `pletonid` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to alter the column `nomor_pleton` on the `Pleton` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `pleton_mahasiswa` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_pletonid_fkey";

-- DropIndex
DROP INDEX "Mahasiswa_pletonid_key";

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "pletonid",
ADD COLUMN     "pleton_mahasiswa" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pleton" ALTER COLUMN "nomor_pleton" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_pleton_mahasiswa_fkey" FOREIGN KEY ("pleton_mahasiswa") REFERENCES "Pleton"("pletonid") ON DELETE RESTRICT ON UPDATE CASCADE;
