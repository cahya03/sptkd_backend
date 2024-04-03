const express = require('express');
const dotenv = require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
const router = require('./routes/router');
app.use(router);

// Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});