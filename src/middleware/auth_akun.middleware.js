const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.verifyAkun = async (req, res, next) => {
  if (!req.session.akun_id) {
    return res.status(401).json({ message: "Please Login" });
  }
  const akun = await prisma.akun.findUnique({
    where: {
      akun_id: req.session.akun_id,
    },
    include:{
      level: true,
    }
  });
  if (!akun) {
    return res.status(404).json({ message: "Akun not found" });
  }
  req.akun_id = akun.akun_id;
  req.akun_role = akun.level.akun_level_nama;
  next();
};

exports.adminOnly = async (req, res, next) => {
  const akun = await prisma.akun.findUnique({
    where: {
      akun_id: req.session.akun_id,
    },
    include:{
      level: true,
    }
  });
  if (!akun) {
    return res.status(404).json({ message: "Akun not found" });
  }
  if(akun.level.akun_level_nama !== 'Admin'){
    return res.status(403).json({ message: "Forbidden Access" });
  }
  next();
};