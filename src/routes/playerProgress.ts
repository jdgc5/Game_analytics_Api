import express from 'express';
import { validatePlayerIdParam } from '../middlewares/validatePlayerIdParam';
import { validateBodyFields } from '../middlewares/validateBodyFields';
import { getPlayerProgress, setPlayerProgress, resetPlayerProgress, createPlayer} from '../controllers/playerProgressController';

const router = express.Router();
router.post('/players', createPlayer); 
router.get('/:playerId/progress', validatePlayerIdParam, getPlayerProgress);
router.patch('/:playerId/progress', validatePlayerIdParam, validateBodyFields(['totalStars','unlocks','worldsList']), setPlayerProgress);
router.post('/:playerId/progress/reset', validatePlayerIdParam, resetPlayerProgress);


export default router;


