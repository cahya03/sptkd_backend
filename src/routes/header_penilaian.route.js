const express = require('express');
const router = express.Router();

const headerPenilaianController = require('../controller/header_penilaian.controller');

router.get('/api/headerpenilaian', headerPenilaianController.listHeaderPenilaian);
router.post('/api/headerpenilaian', headerPenilaianController.createHeaderPenilaian);
router.get('/api/headerpenilaian/:id', headerPenilaianController.showHeaderPenilaian);
router.patch('/api/headerpenilaian/:id', headerPenilaianController.updateHeaderPenilaian);
router.delete('/api/headerpenilaian/:id', headerPenilaianController.deleteHeaderPenilaian);

module.exports = router;