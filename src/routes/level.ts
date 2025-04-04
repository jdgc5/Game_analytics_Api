import express from 'express';
import { saveLevel, getLevel, getAllLevels, updateLevel, deleteLevel } from '../controllers/levelController';

const router = express.Router();
router.post('/', saveLevel);
router.get('/:id', getLevel);
router.get('/user/:userId', getAllLevels);
router.put('/:id', updateLevel);
router.delete('/:id', deleteLevel);

export default router;


