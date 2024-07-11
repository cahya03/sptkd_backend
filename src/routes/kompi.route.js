const express = require('express')
const router = express.Router();

const kompiController = require("../controller/kompi.controller.js")

router.get('/api/kompi', kompiController.listKompi)
router.get('/api/kompi/:id', kompiController.listKompibyBatalyonID)

module.exports = router;