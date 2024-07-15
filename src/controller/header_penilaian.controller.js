//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { insertPenilaianfromHeaderPage } = require("./penilaian.controller");

exports.listHeaderPenilaian = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const headerPenilaian = await prisma.header_penilaian.findMany({
      skip: startIndex,
      take: limit,
    });

    const totalCount = await prisma.header_penilaian.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(headerPenilaian);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching header dari penilaian" });
  }
};

exports.createHeaderPenilaian = async (req, res) => {
  try {
    const {
      header_penilaian_nama,
      header_penilaian_deskripsi,
      header_penilaian_tanggal_mulai,
      header_penilaian_tanggal_selesai,
      peleton_id
    } = req.body;
    
    //Check if header penilaian already exists
    const headerPenilaianExists = await prisma.header_penilaian.findUnique({
      where: {
        header_penilaian_nama: header_penilaian_nama,
      },
    });
    if (headerPenilaianExists) {
      return res
        .status(400)
        .json({ message: "Header Penilaian already exists" });
    }

    //Create header penilaian
    const createdHeaderPenilaian = await prisma.header_penilaian.create({
      data: {
        header_penilaian_nama: header_penilaian_nama,
        header_penilaian_deskripsi: header_penilaian_deskripsi,
        header_penilaian_tanggal_mulai: header_penilaian_tanggal_mulai,
        header_penilaian_tanggal_selesai: header_penilaian_tanggal_selesai,
      },
    });
    await insertPenilaianfromHeaderPage({
      header_penilaian_id: createdHeaderPenilaian.header_penilaian_id,
      peleton_id: peleton_id
    });
    
    res.status(200).json(createdHeaderPenilaian);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating header penilaian" });
  }
};

exports.showHeaderPenilaian = async (req,res) =>{
  try {
    const headerPenilaian = await prisma.header_penilaian.findUnique({
      where: {header_penilaian_id:parseInt(req.params.id)}
    });
    if (!headerPenilaian) {
      return res.status(404).json({message: "Header Penilaian not found"});
    }
    res.status(200).json(headerPenilaian)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error fetching header penilaian"});
  }
}

exports.updateHeaderPenilaian = async (req, res) =>{
  const headerPenilaian = await prisma.header_penilaian.findUnique({
    where: {header_penilaian_id:parseInt(req.params.id)}
  });
  if (!headerPenilaian) {
    return res.status(404).json({message: "Header Penilaian not found"});
  }
  const {header_penilaian_nama, header_penilaian_deskripsi, header_penilaian_tanggal_mulai, header_penilaian_tanggal_selesai} = req.body;
  try {
    const updatedHeaderPenilaian = await prisma.header_penilaian.update({
      where: {header_penilaian_id:parseInt(req.params.id)},
      data: {
        header_penilaian_nama: header_penilaian_nama,
        header_penilaian_deskripsi: header_penilaian_deskripsi,
        header_penilaian_tanggal_mulai: header_penilaian_tanggal_mulai,
        header_penilaian_tanggal_selesai: header_penilaian_tanggal_selesai
      }
    });
    res.status(201).json({message: ""});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error updating header penilaian"});
  }
} 

exports.deleteHeaderPenilaian = async (req, res) =>{
  const headerPenilaian = await prisma.header_penilaian.findUnique({
    where: {header_penilaian_id:parseInt(req.params.id)}
  });
  if (!headerPenilaian) {
    return res.status(404).json({message: "Header Penilaian not found"});
  }
  try {
    await prisma.header_penilaian.delete({
      where: {header_penilaian_id:parseInt(req.params.id)}
    });
    res.status(200).json({message: "Header Penilaian deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error deleting header penilaian"});
  }
}