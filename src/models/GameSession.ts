import mongoose, { Schema, Document } from 'mongoose';

interface IAttempt {
  timestamp: Date;
  success: boolean;
  stars?: number; 
  waves: number;
  timeSpent: number;
}

export interface IGameSession extends Document {
  playerId: string;
  level: number;
  stars: number;
  completed: boolean;
  startedAt: Date;
  endedAt: Date;
  attempts: IAttempt[];
}

const AttemptSchema = new Schema<IAttempt>({
  timestamp: { type: Date, default: Date.now },
  success: { type: Boolean, required: true },
  stars: { type: Number, min: 0, max: 3 }, 
  waves: { type: Number, required: true },
  timeSpent: { type: Number, required: true }
});

const GameSessionSchema = new Schema<IGameSession>({
  playerId: { type: String, required: true },
  level: { type: Number, required: true },
  stars: { type: Number, required: true, min: 0, max: 3 },
  completed: { type: Boolean, default: false },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date, required: true },
  attempts: { type: [AttemptSchema], default: [] }
});

export default mongoose.model<IGameSession>('GameSession', GameSessionSchema);
