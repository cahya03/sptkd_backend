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
    if(req.akun_role === "Admin"){
      response = await prisma.penilaian.findMany({
        skip: startIndex,
        take: limit,
        include: {
          mahasiswa: true,
          pejabat: true,
          indikator: true,
        },
      });
    } 
    if(req.akun_role === "Pejabat"){
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
        },
      });
    }
    
    else {
      response = await prisma.penilaian.findMany({
        skip: startIndex,
        take: limit,
        where: {
          mahasiswa_id: req.akun_id,
        },
        include: {
          mahasiswa: true,
          pejabat: true,
          indikator: true,
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

exports.insertPenilaianfromHeaderPage = async (data, res) => {
  const { header_penilaian_id, peleton_id } = data;

  //validasi request body
  if (!header_penilaian_id || !peleton_id) {
    return res
      .status(400)
      .json({ message: "header_penilaian_id and peleton_id are required" });
  }

  try {
    const result = await createPenilaian(header_penilaian_id, peleton_id);
    res
      .status(201)
      .json({ message: "Penilaian Created Successfully", data: result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating penilaian", error: error.message });
  }
};

exports.listPenilaianbyHeaderId = async (req, res) => {
  const { header_penilaian_id } = req.params;
  try {
    console.log(header_penilaian_id);
    const penilaian = await prisma.penilaian.findMany({
      where: {
        header_penilaian_id: parseInt(header_penilaian_id),
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
  const penilaianData = req.body;
  try{
    const updatedPenilaian = await Promise.all(
      penilaianData.map(async (penilaian)=>{
        return await prisma.penilaian.update({
          where: {penilaian_id:penilaian.penilaian_id},
          data:{penilaian_nilai:penilaian.penilaian_nilai },
        });
      })
    );
    res.status(200).json(updatedPenilaian);
  } catch(error){
    console.log(error);
    res.status(500).json({message: "Error updating penilaian"})
  }
};
