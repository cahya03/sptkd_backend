/*
  Warnings:

  - Made the column `pleton_nama` on table `Pleton` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Pleton` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pleton" ALTER COLUMN "pleton_nama" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
