import Event from '../models/GameEvent';
import { exportEventsToExcel } from '../utils/exporterGameEvents';
import { Request, Response } from 'express';


export const generateEventReport = async (_req: Request, res: Response) => {
    const events = await Event.find().lean();
    const buffer = await exportEventsToExcel(events);

    res.attachment('report.xlsx');
    res.send(buffer);
    
};

export const generateEventReportPlayer = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    if (!playerId) {
        return res.status(400).json({ message: "Missing playerId parameter" });
    }

    try {
        const sessions = await Event.find({ playerId }).lean();

        if (!sessions.length) {
            return res.status(404).json({ message: "No data found for player" });
        }

        const buffer = await exportEventsToExcel(sessions);

        res.attachment(`report-${playerId}.xlsx`);
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating player report" });
    }
};

