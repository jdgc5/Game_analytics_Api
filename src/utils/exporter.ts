import { Workbook } from "exceljs";
import { IGameSession } from "../models/GameSession";

export const exportAttemptsToExcel = async (sessions: IGameSession[]) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Game Attempts");

    worksheet.columns = [
        { header: "Player ID", key: "playerId", width: 20 },
        { header: "Level", key: "level", width: 10 },
        { header: "Attempt #", key: "attemptNumber", width: 10 },
        { header: "Success", key: "success", width: 10 },
        { header: "Stars", key: "stars", width: 10 },
        { header: "Waves", key: "waves", width: 15 },
        { header: "Time Spent (s)", key: "timeSpent", width: 15 },
        { header: "Timestamp", key: "timestamp", width: 20 },
    ];

    sessions.forEach((session) => {
        session.attempts.forEach((attempt, index) => {
            worksheet.addRow({
                playerId: session.playerId,
                level: session.level,
                attemptNumber: index + 1,
                success: attempt.success ? "Yes" : "No",
                stars: attempt.stars ?? "-",
                waves: attempt.waves,
                timeSpent: attempt.timeSpent,
                timestamp: attempt.timestamp,
            });
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
