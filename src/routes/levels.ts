import express from 'express';
import { validateBodyFields } from '../middlewares/validateBodyFields';
import { validatePlayerIdParam } from '../middlewares/validatePlayerIdParam';
import { validateUserIdAndLevelIdParams } from '../middlewares/validateUserIdAndLevelIdParams';
import { createLevel, getLevel, getAllLevels, updateLevel, deleteLevel, deleteAllLevelByUser } from '../controllers/levelController';

const router = express.Router();
router.post('/', validateBodyFields(['name', 'userId', 'world', 'levelId', 'starsTarget', 'timeTarget', 'obstacleList']),createLevel);
router.get('/user/:userId/level/:levelId', validateUserIdAndLevelIdParams , getLevel);
router.get('/user/:userId', validatePlayerIdParam,getAllLevels);
router.put('/:id', validateBodyFields(['name', 'userId','world', 'levelId', 'starsTarget', 'timeTarget', 'obstacleList']) , updateLevel);
router.delete('/user/:userId/level/:levelId', validateUserIdAndLevelIdParams, deleteLevel);
router.delete('/user/:userId', validatePlayerIdParam,deleteAllLevelByUser);

export default router;


