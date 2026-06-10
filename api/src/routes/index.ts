import express from 'express';
import { getData, getListOfFiles } from '../services/files';

const router = express.Router();

router.get('/files/data', getData);
router.get('/files/list', getListOfFiles);

export default router;
