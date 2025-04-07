import { Request, Response } from 'express';
import PlayerProgress, { IPlayerProgress, IWorld, ILevelList } from '../models/PlayerProgress';
import { createEmptyPlayerProgress, resetExistingPlayerProgress ,mergeWorlds } from '../services/playerProgress.service';

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
    const { playerId, totalStars, unlocks, worldsList } = req.body;

    try {
        let playerProgress: IPlayerProgress | null = await PlayerProgress.findOne({ playerId });

        if (!playerProgress) {
            playerProgress = new PlayerProgress({ playerId, totalStars, unlocks, worldsList});
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

/**
 * Resets all progress for a specific player by clearing their levels.
 * 
 * Body:
 * - playerId: string — ID of the player whose progress should be reset
 * 
 * Behavior:
 * - If the player doesn't exist, creates a new empty record
 * - If the player exists, clears all levels
 * 
 * Returns:
 * - 200 OK: the updated (or created) progress document with no levels
 * - 400 Bad Request: if `playerId` is missing
 * - 500 Internal Server Error: if the operation fails
 */
export const resetPlayerProgress = async (req: Request, res: Response) => {
    const { playerId } = req.body;

    try {
        let player = await PlayerProgress.findOne({ playerId });
        player = !player ? await createEmptyPlayerProgress(playerId) : await resetExistingPlayerProgress(playerId);
        await player.save();
        res.status(200).json({ success: true, message: 'Player progress reset successfully', player });
    } catch (error) {
        console.error('Error resetting player progress:', error);
        res.status(500).json({ message: 'Error resetting player progress', error });
    }
};