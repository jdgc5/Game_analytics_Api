import { Request, Response } from 'express';
import Event from '../models/GameEvent';

/**
 * Creates a new game event entry in the database.
 * 
 * Body:
 * - Expects the full event object in the request body (must match schema)
 * 
 * Returns:
 * - 201 Created: if the event is saved successfully
 * - 400 Bad Request: if the request body is missing or invalid
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error saving event', error });
  }
};

/**
 * Retrieves all game events from the database.
 * 
 * Process:
 * - Fetches all events
 * - Sorts them by `timestamp` descending (newest first)
 * 
 * Returns:
 * - 200 OK: with an array of all events
 * - 500 Internal Server Error: if the operation fails
 */
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error getting events', error });
  }
};

/**
 * Retrieves all events for a specific player.
 * 
 * Route param:
 * - `playerId`: string — ID of the player
 * 
 * Process:
 * - Filters events by `playerId`
 * - Sorts them by `timestamp` descending (newest first)
 * 
 * Returns:
 * - 200 OK: with an array of player-specific events
 * - 400 Bad Request: if `playerId` is missing
 * - 500 Internal Server Error: if the operation fails
 */
export const getEventsByPlayer = async (req: Request, res: Response) => {
  const { playerId } = req.params;

  if (!playerId) {
    return res.status(400).json({ message: 'Missing playerId parameter' });
  }

  try {
    const events = await Event.find({ playerId }).sort({ timestamp: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error getting player events', error });
  }
};