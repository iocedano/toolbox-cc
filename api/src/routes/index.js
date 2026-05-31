const express = require('express');
const filesService = require('../services/files');

const router = express.Router();

router.get('/files/data', filesService.getData);
router.get('/files/list', filesService.getListOfFiles);

module.exports = router;
