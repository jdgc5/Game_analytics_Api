import { Request, Response } from 'express';
import Event from '../models/GameEvent';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error saving event', error });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error getting events', error });
  }
};

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