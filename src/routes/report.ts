import express from 'express';
import { generateEventReport, generateEventReportPlayer } from '../controllers/eventReportController';

const router = express.Router();
router.get('/', generateEventReport);
router.get('/:playerId', generateEventReportPlayer);

export default router;


