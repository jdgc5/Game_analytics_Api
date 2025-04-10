import mongoose, { Schema } from 'mongoose';

const levelSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true }, 
    world: { type: String, required: true },
    levelId: { type: Number, required: true },
    starsTarget: { type: Number, required: true },
    timeTarget: { type: Number, required: true },
    obstacleList: { type: [Schema.Types.Mixed], required: true },
    ballList: { type: [Schema.Types.Mixed], required: false },
    exitList: { type: [Schema.Types.Mixed], required: false },
    flowList: { type: [Schema.Types.Mixed], required: false },
    blockList: { type: [Schema.Types.Mixed], required: false },
    createdAt: { type: Date, default: Date.now }
});

levelSchema.set('toJSON', {
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model('Level', levelSchema);

