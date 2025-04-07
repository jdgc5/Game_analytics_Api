import express from 'express';
import { validatePlayerIdParam } from '../middlewares/validatePlayerIdParam';
import { validateBodyFields } from '../middlewares/validateBodyFields';
import { getPlayerProgress, setPlayerProgress, resetPlayerProgress, createPlayer} from '../controllers/playerProgressController';

const router = express.Router();
router.post('/createPlayer', createPlayer); 
router.get('/:playerId', validatePlayerIdParam, getPlayerProgress);
router.patch('/:playerId', validatePlayerIdParam, validateBodyFields(['totalStars','unlocks','worldsList']), setPlayerProgress);
router.post('/:playerId/resetProgress', validatePlayerIdParam, resetPlayerProgress);


export default router;


