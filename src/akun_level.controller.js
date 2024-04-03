//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Controller
exports.listAkunLevel = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const akun_level = await prisma.akun_level.findMany({
      skip: startIndex,
      take: limit,
    });

    const totalCount = await prisma.akun_level.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(akun_level);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching akun_level" });
  }
};

exports.createAkunLevel = async (req, res) => {
  try {
    const { akun_level_nama } = req.body;

    //Create role
    const createdAkunLevel = await prisma.akun_level.create({
      data: {
        akun_level_nama: akun_level_nama,
      },
    });

    res.status(201).json(createdAkunLevel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating akun_level" });
  }
};

exports.deleteAkunLevel = async (req, res) => {
  try {
    const {id} = req.params;

    //Delete role
    const deletedAkunLevel = await prisma.akun_level.delete({
      where: {
        akun_level_id: parseInt(id),
      },
    });

    res.status(200).json(deletedAkunLevel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting akun_level" });
  }
}
