-- CreateTable
CREATE TABLE "HasilPenilaian" (
    "hp_id" SERIAL NOT NULL,
    "hp_mahasiswa_id" INTEGER NOT NULL,
    "hp_penilai_id" INTEGER NOT NULL,
    "hp_indikator_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HasilPenilaian_pkey" PRIMARY KEY ("hp_id")
);

-- AddForeignKey
ALTER TABLE "HasilPenilaian" ADD CONSTRAINT "HasilPenilaian_hp_mahasiswa_id_fkey" FOREIGN KEY ("hp_mahasiswa_id") REFERENCES "Akun"("akun_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPenilaian" ADD CONSTRAINT "HasilPenilaian_hp_penilai_id_fkey" FOREIGN KEY ("hp_penilai_id") REFERENCES "Akun"("akun_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPenilaian" ADD CONSTRAINT "HasilPenilaian_hp_indikator_id_fkey" FOREIGN KEY ("hp_indikator_id") REFERENCES "Indikator"("indikator_id") ON DELETE RESTRICT ON UPDATE CASCADE;
