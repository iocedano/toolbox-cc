const express = require('express');
const filesService = require('../services/files');
const healthService = require('../services/health');

const router = express.Router();

router.get('/files/data', filesService.getData);
router.get('/files/list', filesService.getListOfFiles);

router.get('/health', healthService.getHealth);

module.exports = router;
