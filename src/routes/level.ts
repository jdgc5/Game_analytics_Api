import express from 'express';
import { saveLevel, getLevel, getAllLevels, updateLevel, deleteLevel } from '../controllers/levelController';

const router = express.Router();
router.post('/levels', saveLevel);
router.get('/levels/:id', getLevel);
router.get('/levels/user/:userId', getAllLevels);
router.put('/levels/:id', updateLevel);
router.delete('/levels/:id', deleteLevel);

export default router;


