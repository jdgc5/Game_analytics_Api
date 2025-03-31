import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  playerId: string;
  level: number;
  stars: number;
  attempts: number;
  timeSpent: number;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>({
  playerId: { type: String, required: true },
  level: { type: Number, required: true },
  stars: { type: Number, required: true },
  attempts: { type: Number, required: true },
  timeSpent: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IEvent>('Event', EventSchema);
