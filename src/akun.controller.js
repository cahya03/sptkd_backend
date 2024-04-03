//Impor modul
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listAkun = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const akun = await prisma.akun.findMany({
      skip: startIndex,
      take: limit,
    });

    const totalCount = await prisma.akun.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(akun);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.createAkun = async (req, res) => {
  try {
    const { akun_username, akun_email, akun_password, akun_level_id } =
      req.body;

    //Check if user already exists
    const userExists = await prisma.akun.findUnique({
      where: {
        akun_email: akun_email,
      },
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(akun_password, 10);

    //Create user
    const createdAkun = await prisma.akun.create({
      data: {
        akun_username: akun_username,
        akun_email: akun_email,
        akun_password: hashedPassword,
        akun_level_id: parseInt(akun_level_id),
      },
    });
    res.status(201).json(createdAkun);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.showAkun = async (req, res) => {
  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    if (!akun) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(akun);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.updateAkun = async (req, res) => {
  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    if (!akun) {
      return res.status(404).json({ message: "User not found" });
    }
    const { akun_password, ...rest } = req.body;
    const updatedData = {
      ...rest,
      akun_password: akun_password
        ? await bcrypt.hash(akun_password, 10)
        : akun.akun_password,
    };
    const updatedAkun = await prisma.akun.update({
      where: {
        akun_id: parseInt(req.params.id),
      },
      data: updatedData,
    });
    res.status(200).json(updatedAkun);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteAkun = async (req, res) => {
  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    if (!akun) {
      return res.status(404).json({ message: "User not found" });
    }
    await prisma.akun.delete({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

exports.loginAkun = async (req, res) => {
  const { akun_username, akun_password } = req.body;

  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_username: akun_username,
      },
    });
    if (!akun) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(
      akun_password,
      akun.akun_password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = {id: akun.akun_id}
    const secret = process.env.TOKEN_SECRET;
    const expiresIn = 60*60*1; 
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresIn,
    });
    return res.header("auth-token", token).json({
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
