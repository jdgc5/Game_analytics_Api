import express from 'express';
import { validateBodyFields } from '../middlewares/validateBodyFields';
import { getPlayerProgress, setPlayerProgress, resetPlayerProgress} from '../controllers/playerProgressController';

const router = express.Router();
router.get('/:playerId', validateBodyFields(['playerId']), getPlayerProgress);
router.post('/', validateBodyFields(['playerId','totalStars','unlocks','worldsList']), setPlayerProgress);
router.post('/reset', validateBodyFields(['playerId']), resetPlayerProgress)


export default router;


