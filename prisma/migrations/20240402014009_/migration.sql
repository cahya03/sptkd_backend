/*
  Warnings:

  - You are about to drop the column `kompi_nama` on the `Kompi` table. All the data in the column will be lost.
  - Added the required column `batalyon_id` to the `Kompi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kompi" DROP COLUMN "kompi_nama",
ADD COLUMN     "batalyon_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Batalyon" (
    "batalyon_id" SERIAL NOT NULL,
    "batalyon_kode" TEXT NOT NULL,
    "batalyon_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batalyon_pkey" PRIMARY KEY ("batalyon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Batalyon_batalyon_kode_key" ON "Batalyon"("batalyon_kode");

-- AddForeignKey
ALTER TABLE "Kompi" ADD CONSTRAINT "Kompi_batalyon_id_fkey" FOREIGN KEY ("batalyon_id") REFERENCES "Batalyon"("batalyon_id") ON DELETE RESTRICT ON UPDATE CASCADE;
