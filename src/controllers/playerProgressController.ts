import { Request, Response } from 'express';
import PlayerProgress from '../models/PlayerProgress';

/**
 * Creates or updates a player's progress for a specific level.
 * 
 * Body:
 * - `playerId`: string — ID of the player
 * - `level`: number — level number being updated
 * - `stars`: number — stars earned in that level
 * 
 * Process:
 * - If no progress exists for the player, creates a new record with the level info.
 * - If the level already exists and the new `stars` are higher, updates it.
 * - If it's a new level for the player, adds it to the list.
 * 
 * Returns:
 * - 201 Created: if a new progress record is created
 * - 200 OK: if the existing progress is updated
 * - 400 Bad Request: if any required field is missing
 * - 500 Internal Server Error: if the operation fails
 */
export const setPlayerProgress = async (req: Request, res: Response) => {
    const { playerId, level, stars } = req.body;

    if (!playerId || level === undefined || stars === undefined) {
        return res.status(400).json({ message: 'Missing playerId, level or stars' });
    }

    try {
        const progress = await PlayerProgress.findOne({ playerId });
        const newTimestamp = new Date();

        if (!progress) {

            const newProgress = new PlayerProgress({
                playerId,
                levels: [{ level, stars, timestamp: newTimestamp }]
            });
            await newProgress.save();
            return res.status(201).json(newProgress);
        }

        const levelEntry = progress.levels.find(l => l.level === level);

        if (levelEntry) {
            if (stars > levelEntry.stars) {
                levelEntry.stars = stars;
                levelEntry.timestamp = newTimestamp;
            }
        } else {
            progress.levels.push({ level, stars, timestamp: newTimestamp });
        }
        await progress.save();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error updating player progress', error });
    }
};

/**
 * Retrieves the full progress of a specific player.
 * 
 * Route param:
 * - `playerId`: string — ID of the player
 * 
 * Returns:
 * - 200 OK: the progress document for the player
 * - 400 Bad Request: if `playerId` is missing
 * - 404 Not Found: if no progress is found for the player
 * - 500 Internal Server Error: if the operation fails
 */
export const getPlayerProgress = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    if (!playerId) {
        return res.status(400).json({ message: 'Missing playerId parameter' });
    }
    try {
        const progress = await PlayerProgress.findOne({ playerId });
        if (!progress) {
            return res.status(404).json({ message: 'Player progress not found' });
        }
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error getting player progress', error });
    }
};