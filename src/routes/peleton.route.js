const express = require('express')
const router = express.Router();

const peletonController = require("../controller/peleton.controller.js")

router.get('/api/peleton', peletonController.listPeleton)
router.get('/api/peleton/:id', peletonController.listPeletonbyKompiID)

module.exports = router;