import express from 'express';
import { validateBodyFields } from '../middlewares/validateBodyFields';
import { createLevel, getLevel, getAllLevels, updateLevel, deleteLevel } from '../controllers/levelController';

const router = express.Router();
router.post('/', validateBodyFields(['name', 'world', 'levelId', 'starsTarget', 'timeTarget', 'obstacleList']),createLevel);
router.get('/:id', validateBodyFields(["levelId"]) ,getLevel);
router.get('/user/:userId', getAllLevels);
router.put('/:id', validateBodyFields(['name', 'world', 'levelId', 'starsTarget', 'timeTarget', 'obstacleList']) , updateLevel);
router.delete('/:id', deleteLevel);

export default router;


