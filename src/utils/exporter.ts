import { Workbook } from "exceljs";
import { IGameEvent } from "../models/GameEvent";

export const exportEventsToExcel = async (events: IGameEvent[]) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Game Events");

    // Main title (Row 1)
    worksheet.mergeCells("A1", "F1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Player Session Report";
    titleCell.font = { size: 18, bold: true, color: { argb: "FFFFFFFF" } };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };
    titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2E86C1" }, // Blue background
    };
    worksheet.getRow(1).height = 50;

    // Column headers (Row 2)
    const headers = ["Player ID", "Level", "Stars", "Waves", "Time Spent (s)", "Timestamp"];
    worksheet.addRow(headers);

    const headerRow = worksheet.getRow(2);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFABEBC6" }, // Light green background
        };
        cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };
    });

    // Column configuration with formatting
    worksheet.columns = [
        { key: "playerId", width: 25 },
        { key: "level", width: 10 },
        { key: "stars", width: 10 },
        { key: "waves", width: 12 },
        { key: "timeSpent", width: 15 },
        {
            key: "timestamp",
            width: 25,
            style: { numFmt: "dd/mm/yyyy hh:mm" }, // Apply date format
        },
    ];

    // Data rows
    events.forEach((event) => {
        worksheet.addRow([
            event.playerId,
            event.level,
            event.stars,
            event.waves,
            event.timeSpent,
            new Date(event.timestamp), // Ensure it's a Date object
        ]);
    });

    // Center all cells from row 3 down
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 2) {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: "center", vertical: "middle" };
            });
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
