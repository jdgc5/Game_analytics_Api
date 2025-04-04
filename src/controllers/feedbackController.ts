import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const createFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: 'Error saving feedback', error });
    }
};

export const getAllFeedback = async (req: Request, res: Response) => {
    try {
        const feedbacks = await Feedback.find().sort({ timestamp: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting feedbacks', error });
    }
};

export const getFeedbackByPlayer = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    try {
        const feedbacks = await Feedback.find({ playerId }).sort({ timestamp: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting player feedbacks', error });
    }
};