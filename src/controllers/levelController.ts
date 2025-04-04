import { Request, Response } from 'express';
import Level from '../models/Level';

/**
 * Saves a new level in the database for a specific user.
 * 
 * Expects:
 * - `name`: string — name of the level
 * - `data`: any — level configuration/details
 * - `userId`: string — ID of the user who owns the level
 * 
 * Returns:
 * - 201 Created: if the level is saved successfully
 * - 400 Bad Request: if any required field is missing
 * - 500 Internal Server Error: if the operation fails
 */
export const saveLevel = async (req: Request, res: Response) => {
    const { name, data, userId } = req.body;

    if (!name || !data || !userId) {
        return res.status(400).json({ message: 'Missing level name, data or userId' });
    }

    try {
        const level = new Level({ name, data, userId });
        await level.save();

        res.status(201).json({ success: true, message: 'Level saved successfully', level });
    } catch (error) {
        console.error('Error saving level:', error);
        res.status(500).json({ message: 'Error saving level', error });
    }
};

/**
 * Retrieves a specific level by its ID (provided by Mongo).
 * 
 * Route param:
 * - `id`: string — ID of the level
 * 
 * Returns:
 * - 200 OK: the level if found
 * - 404 Not Found: if no level exists with that ID
 * - 500 Internal Server Error: if the operation fails
 */
export const getLevel = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const level = await Level.findById(id);

        if (!level) {
            return res.status(404).json({ message: 'Level not found' });
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
 * Route param:
 * - `userId`: string — ID of the user
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
 * Updates the `data` of a level by its ID.
 * 
 * Route param:
 * - `id`: string — ID of the level
 * Body:
 * - `data`: any — updated level content
 * 
 * Returns:
 * - 200 OK: if updated successfully
 * - 400 Bad Request: if `data` is missing
 * - 404 Not Found: if the level is not found
 * - 500 Internal Server Error: if the operation fails
 */
export const updateLevel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ message: 'Missing level data' });
    }

    try {
        const level = await Level.findByIdAndUpdate(id, { data }, { new: true });

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
 * Deletes a level by its ID.
 * 
 * Route param:
 * - `id`: string — ID of the level
 * 
 * Returns:
 * - 200 OK: if the level was deleted successfully
 * - 404 Not Found: if no level is found with that ID
 * - 500 Internal Server Error: if the operation fails
 */
export const deleteLevel = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await Level.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Level not found' });
        }

        res.status(200).json({ success: true, message: 'Level deleted successfully' });
    } catch (error) {
        console.error('Error deleting level:', error);
        res.status(500).json({ message: 'Error deleting level', error });
    }
};
