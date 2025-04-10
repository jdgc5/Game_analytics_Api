import { Request, Response } from 'express';
import Level from '../models/Level';
import { checkLevelExists } from '../services/levelProgress.service';

/**
 * Saves a new level in the database for a specific user.
 * 
 * Returns:
 * - 201 Created: if the level is saved successfully
 * - 400 Bad Request: if any required field is missing
 * - 500 Internal Server Error: if the operation fails
 */
export const createLevel = async (req: Request, res: Response) => {
    const { name,userId,world,levelId,starsTarget,timeTarget,obstacleList } = req.body;

    try {
        const alreadyExists = await checkLevelExists(userId, levelId);
        if (alreadyExists) {
            return res.status(409).json({ message: 'Level already exists for this user' });
        }
        const level = new Level({ name,userId,world,levelId,starsTarget,timeTarget,obstacleList });
        await level.save();

        res.status(201).json({ success: true, message: 'Level saved successfully', level });
    } catch (error) {
        console.error('Error saving level:', error);
        res.status(500).json({ message: 'Error saving level', error });
    }
};

/**
 * Retrieves a specific level by userId and levelId.
 * 
 * Returns:
 * - 200 OK: the level if found
 * - 404 Not Found: if no level exists with that ID
 * - 500 Internal Server Error: if the operation fails
 */
export const getLevel = async (req: Request, res: Response) => {
    const { userId,levelId } = req.params;

    try {
        const level = await Level.findOne({ userId, levelId });
        if (!level) {
            return res.status(404).json({ message: 'Level not found for this user' });
        }
        res.status(200).json(level);
    } catch (error) {
        console.error('Error retrieving level:', error);
        res.status(500).json({ message: 'Error retrieving level', error });
    }
};

/**
 * Retrieves all levels created by a specific user.
 * 
 * Returns:
 * - 200 OK: list of levels sorted by newest first
 * - 500 Internal Server Error: if the operation fails
 */
export const getAllLevels = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const levels = await Level.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(levels);
    } catch (error) {
        console.error('Error retrieving levels:', error);
        res.status(500).json({ message: 'Error retrieving levels', error });
    }
};

/**
 * Updates the `data` of a level by its userId and levelId.
 * 
 * Returns:
 * - 200 OK: if updated successfully
 * - 400 Bad Request: if `data` is missing
 * - 404 Not Found: if the level is not found
 * - 500 Internal Server Error: if the operation fails
 */
export const updateLevel = async (req: Request, res: Response) => {
    const { userId, levelId } = req.params;
    const { name, world, starsTarget, timeTarget, obstacleList, ballList, exitList, flowList, blockList } = req.body;

    try {
        const level = await Level.findOneAndUpdate( { userId, levelId: Number(levelId) },
            { name, world, starsTarget, timeTarget, obstacleList, ballList, exitList, flowList, blockList}, { new: true }
        );

        if (!level) {
            return res.status(404).json({ message: 'Level not found' });
        }

        res.status(200).json({ success: true, message: 'Level updated successfully', level });
    } catch (error) {
        console.error('Error updating level:', error);
        res.status(500).json({ message: 'Error updating level', error });
    }
};

/**
 * Deletes a level by its userID and levelId.
 * 
 * Returns:
 * - 200 OK: if the level was deleted successfully
 * - 404 Not Found: if no level is found with that ID
 * - 500 Internal Server Error: if the operation fails
 */
export const deleteLevel = async (req: Request, res: Response) => {
    const { userId, levelId } = req.params;

    try {
        const deleted = await Level.findOneAndDelete({ userId, levelId: Number(levelId) });

        if (!deleted) {
            return res.status(404).json({ message: 'Level not found' });
        }

        res.status(200).json({ success: true, message: 'Level deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting level', error });
    }
};

export const deleteAllLevelByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await Level.deleteMany({ userId });
        if (!user) {
            return res.status(404).json({ message: 'userId not found' });
        }
        res.status(200).json({ success: true, message: `${userId} Levels has been deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting levels', error });
    }
};
