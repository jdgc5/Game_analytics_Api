import mongoose, { Schema, Document } from 'mongoose';

export interface IStars {
    completed: boolean;
    inTime: boolean;
    inWaves: boolean;
    inAll: boolean;
}

export interface IPerformance {
    attempts: number;
    totalTime: number;
    bestWaves: number;
    bestTime: number;
}

export interface ILevel {
    stars: IStars;
    performance: IPerformance;
}

export interface ILevelList {
    levelName: string;
    level: ILevel;
}

export interface ILevels {
    unlockedStars: number;
    levelList: ILevelList[];
}

export interface IWorld {
    worldName: string;
    levels: ILevels;
}

export interface IPlayerProgress extends Document {
    totalStars: number;
    unlocks: Record<string, unknown>;
    worldsList: IWorld[];
}

const StarsSchema = new Schema<IStars>({
    completed: { type: Boolean, required: true },
    inTime: { type: Boolean, required: true },
    inWaves: { type: Boolean, required: true },
    inAll: { type: Boolean, required: true }
}, { _id: false });

const PerformanceSchema = new Schema<IPerformance>({
    attempts: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    bestWaves: { type: Number, required: true },
    bestTime: { type: Number, required: true }
}, { _id: false });

const LevelSchema = new Schema<ILevel>({
    stars: { type: StarsSchema, required: true },
    performance: { type: PerformanceSchema, required: true }
}, { _id: false });

const LevelListSchema = new Schema<ILevelList>({
    levelName: { type: String, required: true },
    level: { type: LevelSchema, required: true }
}, { _id: false });

const LevelsSchema = new Schema<ILevels>({
    unlockedStars: { type: Number, required: true },
    levelList: { type: [LevelListSchema], required: true }
}, { _id: false });

const WorldSchema = new Schema<IWorld>({
    worldName: { type: String, required: true },
    levels: { type: LevelsSchema, required: true }
}, { _id: false });

const PlayerProgressSchema = new Schema<IPlayerProgress>({
    _id: {type: String},
    totalStars: { type: Number, required: true },
    unlocks: { type: Schema.Types.Mixed, required: true },
    worldsList: { type: [WorldSchema], required: true }
});

export default mongoose.model<IPlayerProgress>('PlayerProgress', PlayerProgressSchema,);
