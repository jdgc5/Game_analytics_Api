import Event from '../models/GameEvent';
import { exportEventsToExcel } from '../utils/exporterGameEvents';
import { Request, Response } from 'express';

/**
 * Generates an Excel report containing all game events.
 * 
 * Process:
 * - Fetches all events from the database
 * - Converts them into an Excel buffer using `exportEventsToExcel`
 * - Sends the buffer as a downloadable file named `report.xlsx`
 * 
 * Returns:
 * - 200 OK: the Excel file is sent as an attachment
 * - 500 Internal Server Error: if the operation fails
 */
export const generateEventReport = async (_req: Request, res: Response) => {
    const events = await Event.find().lean();
    const buffer = await exportEventsToExcel(events);

    res.attachment('report.xlsx');
    res.send(buffer);
};

/**
 * Generates an Excel report for a specific player's game events.
 * 
 * Route param:
 * - `playerId`: string — ID of the player whose events should be included
 * 
 * Process:
 * - Fetches all events by the given playerId
 * - Converts them into an Excel file using `exportEventsToExcel`
 * - Sends the file as an attachment with the name `report-<playerId>.xlsx`
 * 
 * Returns:
 * - 200 OK: the Excel file is sent as an attachment
 * - 400 Bad Request: if `playerId` is missing
 * - 404 Not Found: if no events are found for the given player
 * - 500 Internal Server Error: if the operation fails
 */
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

