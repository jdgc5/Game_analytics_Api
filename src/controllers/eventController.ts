import { Request, Response } from 'express';
import Event from '../models/GameEvent';

/**
 * Creates a new game event.
 * Expects event data in the request body.
 * Returns the created event with status 201, or error with status 400.
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
 * Get all game events.
 * Retrieves and sorting all game events sorted by timestamp in descending order
 * Returns an array of events with status 200, or error with status 500.
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
 * Retrieves all events for a specific Player sorted by timestamp in descending order.
 * Expected playerId as a route parameter
 * Returns an array of events with status 200, or error with status 500.
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