import express from 'express';
import { getPlayerProgress, setPlayerProgress} from '../controllers/playerProgressController';

const router = express.Router();
router.get('/:playerId', getPlayerProgress);
router.post('/:playerId', setPlayerProgress);


export default router;


