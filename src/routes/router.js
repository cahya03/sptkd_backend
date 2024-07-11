const express = require('express');
const router = express.Router();

const indikatorController = require('../controller/indikator.controller');
const kelompokIndikatorController = require('../controller/kelompok_indikator.controller');

router.get('/', (req, res) => {res.status(200).json({ message: 'Connected!'})});

//Routes Indikator
router.get('/api/indikator', indikatorController.listIndikator);

//Routes Kelompok Indikator
router.get('/kelompokindikator', kelompokIndikatorController.listKelompokIndikator);

module.exports = router;