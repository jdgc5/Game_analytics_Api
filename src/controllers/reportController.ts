import Event from '../models/GameSession';
import { exportAttemptsToExcel } from '../utils/exporter';
import { Request, Response } from 'express';


export const generateReport = async (_req: Request, res: Response) => {
    const events = await Event.find().lean();
    const buffer = await exportAttemptsToExcel(events);

    res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
};

export const generateReportPlayer = async (_req: Request, res: Response) =>{
    


}
