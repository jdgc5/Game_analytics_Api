import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedbackLevel extends Document {
    playerId: string;
    level: number;
    satisfaction: 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
    frustration?: 'none' | 'some' | 'high';
    comment: string;
    timestamp: Date;
}

const FeedbackLevelSchema = new Schema<IFeedbackLevel>({
    playerId: { type: String, required: true },
    level: { type: Number, required: true },
    satisfaction: {type: String, enum: ["low", "medium", "high"], required:false},
    difficulty: { type: String, enum: ["easy", "normal", "hard", "extreme"], required: false },
    frustration: { type: String, enum: ['none', 'some', 'high'], required: false },
    comment: { type: String, maxlength: 1000, required: false },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IFeedbackLevel>('FeedbackLevel', FeedbackLevelSchema);
