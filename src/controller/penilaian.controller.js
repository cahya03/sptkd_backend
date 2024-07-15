//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listPenilaian = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;
    let response;
    if (req.akun_role === "Admin") {
      response = await prisma.penilaian.findMany({
        skip: startIndex,
        take: limit,
        include: {
          mahasiswa: true,
          pejabat: true,
          indikator: true,
          header_penilaian: true,
        },
      });
    } else if (req.akun_role === "Pejabat") {
      response = await prisma.penilaian.findMany({
        skip: startIndex,
        take: limit,
        where: {
          pejabat_id: req.akun_id,
        },
        include: {
          mahasiswa: true,
          pejabat: true,
          indikator: true,
          header_penilaian: true,
        },
      });
    } else if (req.akun_role === "Mahasiswa") {
      response = await prisma.penilaian.findMany({
        skip: startIndex,
        take: limit,
        where: {
          mahasiswa_id: req.mahasiswa_id,
        },
        include: {
          mahasiswa: true,
          pejabat: true,
          indikator: true,
          header_penilaian: true,
        },
      });
    }
    const totalCount = await prisma.penilaian.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching penilaian" });
  }
};

async function createPenilaian(header_penilaian_id, peleton_id) {
  try {
    // Mengambil data mahasiswa dan pejabat berdasarkan peleton_id
    const mahasiswaList = await prisma.mahasiswa.findMany({
      where: { peleton_id: parseInt(peleton_id) },
    });
    console.log(mahasiswaList);
    const pejabatList = await prisma.pejabat.findMany({
      where: { peleton_id: parseInt(peleton_id) },
    });

    // Mengambil semua data indikator
    const indikatorList = await prisma.indikator.findMany();
    // Cek jika kosong
    if (mahasiswaList.length === 0) {
      throw new Error("Mahasiswa not found");
    }
    if (pejabatList.length === 0) {
      throw new Error("Pejabat not found");
    }
    if (indikatorList.length === 0) {
      throw new Error("Indikator not found");
    }

    const penilaianData = [];
    mahasiswaList.forEach((mahasiswa) => {
      pejabatList.forEach((pejabat) => {
        indikatorList.forEach((indikator) => {
          penilaianData.push({
            header_penilaian_id: header_penilaian_id,
            indikator_id: indikator.indikator_id,
            mahasiswa_id: mahasiswa.mahasiswa_id,
            pejabat_id: pejabat.pejabat_id,
            penilaian_nilai: 0,
          });
        });
      });
    });
    console.log(penilaianData);
    const createdPenilaian = await prisma.penilaian.createMany({
      data: penilaianData,
    });
    console.log(createdPenilaian);
  } catch (error) {
    console.error("Error creating penilaian: ", error);
    throw error;
  }
}

exports.insertPenilaianfromHeaderPage = async (data) => {
  const { header_penilaian_id, peleton_id } = data;
  await createPenilaian(header_penilaian_id, peleton_id);
};

exports.listPenilaianbyHeaderId = async (req, res) => {
  try {
    console.log(header_penilaian_id);
    const penilaian = await prisma.penilaian.findMany({
      where: {
        header_penilaian_id: parseInt(req.params.id),
      },
      include: {
        mahasiswa: true,
        pejabat: true,
        indikator: true,
      },
    });
    res.status(200).json(penilaian);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting penilaian", error: error });
  }
};

exports.updatePenilaian = async (req, res) => {
  try {
    const { penilaian_nilai } = req.body;
    console.log(penilaian_nilai)
    const penilaian = await prisma.penilaian.update({
      where: { penilaian_id: parseInt(req.params.id) },
      data: { penilaian_nilai: penilaian_nilai },
    });
    res.status(200).json({ message: "Penilaian updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating penilaian" });
  }
};

exports.getPenilaianbyPejabat = async (req, res) => {
  try {
    const penilaian = await prisma.penilaian.findMany({
      where: {
        pejabat_id: parseInt(req.params.pejabat_id),
      },
      include: {
        mahasiswa: true,
        pejabat: true,
        indikator: true,
      },
    });

    if (!penilaian || penilaian.length === 0) {
      return res
        .status(404)
        .json({ message: "No penilaian found for this pejabat_id" });
    }

    res.status(200).json(penilaian);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting penilaian by pejabat" });
  }
};

exports.getPenilaianbyId = async (req, res) => {
  try {
    const penilaian = await prisma.penilaian.findUnique({
      where: { penilaian_id: parseInt(req.params.id) },
      include: {
        mahasiswa: true,
        pejabat: true,
        indikator: true,
        header_penilaian: true,
      },
    });
    if (!penilaian) {
      return res.status(404).json({ message: "Penilaian not found" });
    }
    const response = {
      ...penilaian,
      header_penilaian_nama: penilaian.header_penilaian.header_penilaian_nama,
      mahasiswa_nama: penilaian.mahasiswa.mahasiswa_nama,
      pejabat_nama: penilaian.pejabat.pejabat_nama,
      indikator_nama: penilaian.indikator.indikator_nama,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Penilaian" });
  }
};
