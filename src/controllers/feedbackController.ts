import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

/**
 * Creates a new feedback entry in the database.
 * 
 * Body:
 * - Expects the full feedback object in the request body (must match the schema).
 * 
 * Returns:
 * - 201 Created: if feedback is saved successfully
 * - 400 Bad Request: if validation fails or data is missing
 */
export const createFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: 'Error saving feedback', error });
    }
};

/**
 * Retrieves all feedback entries from the database.
 * 
 * Returns:
 * - 200 OK: with an array of feedback objects sorted by timestamp (latest first)
 * - 500 Internal Server Error: if the operation fails
 */
export const getAllFeedback = async (req: Request, res: Response) => {
    try {
        const feedbacks = await Feedback.find().sort({ timestamp: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting feedbacks', error });
    }
};

/**
 * Retrieves all feedback entries submitted by a specific player.
 * 
 * Route param:
 * - `playerId`: string — ID of the player
 * 
 * Returns:
 * - 200 OK: with an array of feedbacks sorted by timestamp
 * - 400 Bad Request: if `playerId` is missing
 * - 500 Internal Server Error: if the operation fails
 */
export const getFeedbackByPlayer = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    if (!playerId) {
        return res.status(400).json({ message: 'Missing playerId parameter' });
    }

    try {
        const feedbacks = await Feedback.find({ playerId }).sort({ timestamp: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting player feedbacks', error });
    }
};