/*
  Warnings:

  - A unique constraint covering the columns `[header_penilaian_nama]` on the table `header_penilaian` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "header_penilaian_header_penilaian_nama_key" ON "header_penilaian"("header_penilaian_nama");
