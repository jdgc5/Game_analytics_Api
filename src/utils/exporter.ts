import { Workbook } from "exceljs";
import { IEvent } from "../models/Event";


export const exportEventsToExcel = async (events: IEvent[]) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Game Events");

    worksheet.columns = [
        { header: "Player ID", key: "playerId", width: 20 },
        { header: "Level", key: "level", width: 10 },
        { header: "Stars", key: "stars", width: 10 },
        { header: "Attempts", key: "attempts", width: 10 },
        { header: "Time Spent (s)", key: "timeSpent", width: 15 },
        { header: "Created At", key: "createdAt", width: 20 },
    ];

    events.forEach((event) => {
        worksheet.addRow({
            playerId: event.playerId,
            level: event.level,
            stars: event.stars,
            attempts: event.attempts,
            timeSpent: event.timeSpent,
            createdAt: event.createdAt,
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

