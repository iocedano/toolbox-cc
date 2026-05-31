const express = require('express');
const filesService = require('../services/files');

const router = express.Router();

router.get('/files/data', filesService.getData);

module.exports = router;
