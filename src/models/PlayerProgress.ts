import mongoose, { Schema, Document } from 'mongoose';

interface ILevelProgress {
    level: number;
    stars: number;
    timestamp: Date;
}

export interface IPlayerProgress extends Document {
    playerId: string;
    levels: ILevelProgress[];
}

const LevelProgressSchema = new Schema<ILevelProgress>({
    level: { type: Number, required: true },
    stars: { type: Number, required: true, min: 0, max: 3 },
    timestamp: { type: Date, default: Date.now }
});

const PlayerProgressSchema = new Schema<IPlayerProgress>({
    playerId: { type: String, required: true, unique: true },
    levels: { type: [LevelProgressSchema], default: [] }
});

export default mongoose.model<IPlayerProgress>('PlayerProgress', PlayerProgressSchema);
