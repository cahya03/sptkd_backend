const express = require('express')
const router = express.Router();

const batalyonController = require("../controller/batalyon.controller.js")

router.get('/api/batalyon', batalyonController.listBatalyon)

module.exports = router;