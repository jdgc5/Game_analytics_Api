import Level from "../models/Level";

export const checkLevelExists = async (levelId: number, userId:string): Promise<boolean> => {
    const existing = await Level.findOne({ userId, levelId });
    return !!existing;
}