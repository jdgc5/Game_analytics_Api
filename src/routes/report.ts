import express from 'express';
import { generateReport, generateReportPlayer } from '../controllers/reportController';

const router = express.Router();
router.get('/', generateReport);
router.get('/:playerId', generateReportPlayer);

export default router;


