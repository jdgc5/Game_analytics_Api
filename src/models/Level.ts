// models/Level.ts
import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    name: { type: String, required: true },   
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
});

levelSchema.set('toJSON', {
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export default mongoose.model('Level', levelSchema);
