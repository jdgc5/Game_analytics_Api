import express from 'express';
import { generateReport } from '../controllers/reportController';

const router = express.Router();
router.get('/', generateReport);

export default router;


