import Event from '../models/GameEvent';
import { exportEventsToExcel } from '../utils/exporter';
import { Request, Response } from 'express';


export const generateReport = async (_req: Request, res: Response) => {
    const events = await Event.find().lean();
    const buffer = await exportEventsToExcel(events);

    res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
};

export const generateReportPlayer = async (req: Request, res: Response) => {
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

        res.setHeader('Content-Disposition', `attachment; filename="report-${playerId}.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating player report" });
    }
};

