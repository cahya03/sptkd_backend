/*
  Warnings:

  - You are about to drop the column `penilaian_nilai` on the `Hasil_Penilaian` table. All the data in the column will be lost.
  - Added the required column `hasil_penilaian_nilai` to the `Hasil_Penilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header_penilaian_id` to the `Penilaian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hasil_Penilaian" DROP COLUMN "penilaian_nilai",
ADD COLUMN     "hasil_penilaian_nilai" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Penilaian" ADD COLUMN     "header_penilaian_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "header_penilaian" (
    "header_penilaian_id" SERIAL NOT NULL,
    "header_penilaian_nama" TEXT NOT NULL,
    "header_penilaian_deskripsi" TEXT,
    "header_penilaian_tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "header_penilaian_tanggal_selesai" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "header_penilaian_pkey" PRIMARY KEY ("header_penilaian_id")
);

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_header_penilaian_id_fkey" FOREIGN KEY ("header_penilaian_id") REFERENCES "header_penilaian"("header_penilaian_id") ON DELETE RESTRICT ON UPDATE CASCADE;
