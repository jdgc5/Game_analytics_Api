import { Request, Response } from 'express';
import PlayerProgress from '../models/PlayerProgress';

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