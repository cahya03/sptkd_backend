const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Data untuk kelompok indikator
  const kelompokIndikatorNames = [
    'Sikap Kerja',
    'Keterampilan Komunikasi',
    'Kreativitas dan Inisiatif',
    'Etika dan Integritas',
    'Prestasi dan Produktivitas',
    'Pendidikan dan Pengembangan Diri',
    'Manajemen dan Problem Solving',
    'Kerja Tim',
    'Kesehatan dan Keamanan'
  ];

  // Data untuk indikator
  const indikatorData = {
    'Sikap Kerja': [
      'Sikap terhadap sesama', 'Sikap terhadap senior', 'Sikap terhadap junior', 'Religius', 'Tanggung jawab', 'Cekatan', 'Disiplin', 'Berani', 'Peduli'
    ],
    'Keterampilan Komunikasi': [
      'Komunikatif','Memberi teladan'
    ],
    'Kreativitas dan Inisiatif': [
      'Kreativitas', 'Inisiatif'
    ],
    'Etika dan Integritas': [
      'Jujur', 'Amanah', 'Etika', 'Kepatuhan'
    ],
    'Prestasi dan Produktivitas': [
      'Kualitas kerja', 'Produktivitas', 'Hasil kerja', 'Prestasi', 'Keaktifan'
    ],
    'Pendidikan dan Pengembangan Diri': [
      'Pendidikan', 'Wawasan pekerjaan', 'Pengembangan diri'
    ],
    'Manajemen dan Problem Solving': [
      'Berfikir strategis', 'Kemampuan problem solving', 'Manajemen resiko'
    ],
    'Kerja Tim': [
      'Kerja sama tim','Motivasi belajar'
    ],
    'Kesehatan dan Keamanan': [
      'Kesadaran keselamatan', 'Kesehatan'
    ]
  };

  // Menambahkan data ke tabel KelompokIndikator
  for (const kelompokIndikatorName of kelompokIndikatorNames) {
    // Menambahkan data ke tabel Indikator yang terhubung dengan KelompokIndikator
    for (const indikatorName of indikatorData[kelompokIndikatorName]) {
      await prisma.indikator.create({
        data: {
          indikator_nama: indikatorName,
          kelompok_indikator_id: kelompok_indikator_id
        }
      });
    }
  }

  console.log('Kelompok Indikator dan Indikator records created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
