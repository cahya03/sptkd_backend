const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const port = process.env.PORT;
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const {PrismaClient} = require('@prisma/client')

const router = require("./routes/router");
const authRoute = require("./routes/auth.route.js")
const akunRoute = require("./routes/akun.route.js")
const akunLevelRoute = require("./routes/akun_level.route.js")
const batalyonRoute = require("./routes/batalyon.route.js")
const kompiRoute = require("./routes/kompi.route.js")
const peletonRoute = require("./routes/peleton.route.js")
const mahasiswaRoute = require("./routes/mahasiswa.route.js")
const penilaianRoute = require("./routes/penilaian.route.js")
const pejabatRoute = require("./routes/pejabat.route.js")
const headerPenilaianRoute = require("./routes/header_penilaian.route.js")

const prisma = new PrismaClient();
const app = express();

const store = new PrismaSessionStore(
  prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }
)

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie:{
    secure: 'auto'
  }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());


// Routes
app.use(router);
app.use(akunRoute);
app.use(akunLevelRoute);
app.use(authRoute);
app.use(batalyonRoute);
app.use(kompiRoute);
app.use(peletonRoute);
app.use(mahasiswaRoute);
app.use(penilaianRoute);
app.use(pejabatRoute);
app.use(headerPenilaianRoute);

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
