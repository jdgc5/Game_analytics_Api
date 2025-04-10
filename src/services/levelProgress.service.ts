import Level from "../models/Level";

export const checkLevelExists = async (userId:string, levelId: number): Promise<boolean> => {
    const existing = await Level.findOne({ userId, levelId });
    return !!existing;
}