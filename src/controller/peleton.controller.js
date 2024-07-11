const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listPeleton = async (req, res) => {
  try {
    const peleton = await prisma.peleton.findMany({
      select: {
        peleton_id: true,
        peleton_nama: true,
        kompi_id: true,
      },
    });
    res.status(200).json(peleton);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Peleton" });
  }
};

exports.listPeletonbyKompiID = async (req, res) => {
  try {
    const kompiId= req.params.id;
    const peleton = await prisma.peleton.findMany({
      where: {
        kompi_id: parseInt(kompiId),
      },
      select: {
        peleton_id: true,
        peleton_nama: true,
        kompi_id: true,
      },
    });
    res.status(200).json(peleton);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Peleton" });
  }
};
