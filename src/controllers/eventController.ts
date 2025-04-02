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
