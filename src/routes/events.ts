import express from 'express';
import { createEvent, getAllEvents, getEventsByPlayer } from '../controllers/eventController';

const router = express.Router();
router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/player/:playerId', getEventsByPlayer);


export default router;
