import { Request, Response } from 'express';
import PlayerProgress from '../models/PlayerProgress';
import { createEmptyPlayerProgress, resetExistingPlayerProgress ,mergeWorlds } from '../services/playerProgress.service';

/**
 * Updates a player's progress document.
 * 
 * Route param:
 * - `playerId`: string — ID of the player
 * 
 * Body:
 * - `totalStars`: number — total stars accumulated
 * - `unlocks`: object — unlocked content data
 * - `worldsList`: IWorld[] — array of world-level progress
 * 
 * Behavior:
 * - If no progress exists for the given player, creates a new document with the provided data.
 * - If a document exists, updates `totalStars`, `unlocks`, and merges the `worldsList`.
 * 
 * Returns:
 * - 200 OK: the progress document was created or updated successfully
 * - 500 Internal Server Error: if an error occurs during processing
 */

export const createPlayer = async (req: Request, res: Response) => {
    const playerId = "12315552";

    try {
        const player = await createEmptyPlayerProgress(playerId)
        await player.save();
        res.status(201).json({ success: true, message: 'Player created successfully', playerId, player });
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({ message: 'Error creating player', error });
    }
};

export const setPlayerProgress = async (req: Request, res: Response) => {
    const { playerId} = req.params
    const { totalStars, unlocks, worldsList } = req.body;

    try {
        let playerProgress = await PlayerProgress.findOne({ _id: playerId})

        if (!playerProgress) {
            playerProgress = new PlayerProgress({ _id:playerId, totalStars, unlocks, worldsList});
        } else {
            playerProgress.totalStars = totalStars;
            playerProgress.unlocks = unlocks;
            mergeWorlds(playerProgress.worldsList, worldsList);
        }

        await playerProgress.save();
        res.status(200).json({ success: true, message: 'Player progress updated successfully', playerProgress });
    } catch (error) {
        console.error('Error updating player progress:', error);
        res.status(500).json({ message: 'Error updating player progress', error });
    }
};

/**
 * Retrieves the complete progress of a specific player.
 * 
 * Route param:
 * - `playerId`: string — ID of the player
 * 
 * Returns:
 * - 200 OK: the player's progress document
 * - 404 Not Found: if no progress is found for the given playerId
 * - 500 Internal Server Error: if an error occurs during retrieval
 */
export const getPlayerProgress = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    try {
        const progress = await PlayerProgress.findById(playerId);
        if (!progress) {
            return res.status(404).json({ message: 'Player progress not found' });
        }
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error getting player progress', error });
    }
};

/**
 * Resets all progress data for a specific player.
 * 
 * Route param:
 * - `playerId`: string — ID of the player
 * 
 * Behavior:
 * - If no progress exists for the player, creates a new empty progress document.
 * - If a progress document exists, clears `worldsList`, `unlocks`, and resets `totalStars` to 0.
 * 
 * Returns:
 * - 200 OK: the reset (or newly created) progress document
 * - 500 Internal Server Error: if an error occurs during the reset process
 */

export const resetPlayerProgress = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    try {
        let player = await PlayerProgress.findOne({ playerId });
        player = !player 
        ? await createEmptyPlayerProgress(playerId) 
        : await resetExistingPlayerProgress(player);
        await player.save();
        res.status(200).json({ success: true, message: 'Player progress reset successfully', player });
    } catch (error) {
        console.error('Error resetting player progress:', error);
        res.status(500).json({ message: 'Error resetting player progress', error });
    }
};