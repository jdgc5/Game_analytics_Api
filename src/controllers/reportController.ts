import Event from '../models/Event';
import { exportEventsToExcel } from '../utils/exporter';
import { Request, Response } from 'express';


export const generateReport = async (_req: Request, res: Response) => {
    const events = await Event.find().lean();
    const buffer = await exportEventsToExcel(events);

    res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
};
