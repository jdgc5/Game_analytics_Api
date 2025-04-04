import express from 'express';
import { createFeedback, getAllFeedback, getFeedbackByPlayer } from '../controllers/feedbackController';

const router = express.Router();
router.post('/', createFeedback);
router.get('/', getAllFeedback);
router.get('/feedbackPlayer/:playerId', getFeedbackByPlayer);


export default router;
