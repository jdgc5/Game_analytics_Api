import express from 'express';
import { getPlayerProgress, setPlayerProgress, resetPlayerProgress} from '../controllers/playerProgressController';

const router = express.Router();
router.get('/:playerId', getPlayerProgress);
router.post('/', setPlayerProgress);
router.post('/reset', resetPlayerProgress)


export default router;


