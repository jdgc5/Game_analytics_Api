import { Workbook } from "exceljs";
import { IGameEvent } from "../models/GameEvent";

export const exportEventsToExcel = async (events: IGameEvent[]) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Game Events");

    // Title Design
    const title = "Player Session Report";
    worksheet.mergeCells("A1", "F1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = title;
    titleCell.font = { size: 18, bold: true, color: { argb: "FFFFFFFF" } };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };
    titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2E86C1" },
    };
    worksheet.getRow(1).height = 50;

    // Column headers
    worksheet.columns = [
        { header: "Player ID", key: "playerId", width: 25 },
        { header: "Level", key: "level", width: 10 },
        { header: "Stars", key: "stars", width: 10 },
        { header: "Waves", key: "waves", width: 12 },
        { header: "Time Spent (s)", key: "timeSpent", width: 15 },
        { header: "Timestamp", key: "timestamp", width: 30 },
    ];

    // Header Style
    const headerRow = worksheet.getRow(2);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFABEBC6" }, // verde claro
        };
        cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };
    });

    // Add data rows
    events.forEach((event, index) => {
        const rowIndex = index + 3; // empieza después del título y encabezado
        const row = worksheet.addRow({
            playerId: event.playerId,
            level: event.level,
            stars: event.stars,
            waves: event.waves,
            timeSpent: event.timeSpent,
            timestamp: event.timestamp,
        });

        // Center Info
        row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "middle" };
        });
    });

    // give back buffer to send excel.
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
