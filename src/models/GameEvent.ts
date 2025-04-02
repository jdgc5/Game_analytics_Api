import mongoose, { Schema, Document } from 'mongoose';

export interface IGameEvent extends Document {
  playerId: string;
  level: number;
  stars: number;
  waves: number;
  timeSpent: number;
  timestamp: Date;
}

const GameEventSchema = new Schema<IGameEvent>({
  playerId: { type: String, required: true },
  level: { type: Number, required: true },
  stars: { type: Number, required: true, min: 1, max: 3 },
  waves: { type: Number, required: true },
  timeSpent: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IGameEvent>('GameEvent', GameEventSchema);
