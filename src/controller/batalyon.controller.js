const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listBatalyon = async (req, res) => {
  try {
    const batalyon = await prisma.batalyon.findMany({
      select: {
        batalyon_id: true,
        batalyon_nama: true,
      },
    });
    res.status(200).json(batalyon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Batalyon" });
  }
};
