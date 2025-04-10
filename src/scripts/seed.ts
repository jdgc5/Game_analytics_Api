import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Level from '../models/Level';

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Missing MONGO_URI environment variable.");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to DB', error);
        process.exit(1);
    }
};

const seedLevels = [
    {
        name: 'Level1',
        userId: 'pruebaUserId',
        world: 'prueba',
        levelId: 1,
        starsTarget: 3,
        timeTarget: 30,
        obstacleList: [
            {
                "type": 0,
                "points": [
                    {
                        "x": 4.0,
                        "y": 2.5
                    },
                    {
                        "x": -7.0,
                        "y": 8.0
                    },
                    {
                        "x": 14.0,
                        "y": 8.0
                    },
                    {
                        "x": 14.0,
                        "y": 0.0
                    },
                    {
                        "x": 5.0,
                        "y": 0.0
                    }
                ],
                "position": {
                    "x": 0.0,
                    "y": 0.0
                },
                "scale": {
                    "x": 1.0,
                    "y": 1.0
                }
            },
            {
                "type": 0,
                "points": [
                    {
                        "x": -7.0,
                        "y": 2.0
                    },
                    {
                        "x": 3.5,
                        "y": 0.5
                    },
                    {
                        "x": 3.5,
                        "y": -0.5
                    },
                    {
                        "x": -7.0,
                        "y": -2.0
                    }
                ],
                "position": {
                    "x": -3.0,
                    "y": 0.0
                },
                "scale": {
                    "x": 1.0,
                    "y": 1.0
                }
            },
        ],
        "ballList": [
            {
                "type": 0,
                "position": {
                    "x": -5.28000020980835,
                    "y": 2.740000009536743
                },
                "scale": {
                    "x": 1.0,
                    "y": 1.0
                },
                "rotation": 0.0,
                "initialVelocity": {
                    "x": 0.0,
                    "y": 0.0
                }
            }
        ],
        "exitList": [
            {
                "type": 0,
                "position": {
                    "x": -5.0,
                    "y": -2.700000047683716
                },
                "scale": {
                    "x": 1.0,
                    "y": 1.0
                },
                "rotation": 0.0
            }
        ],
        "flowList": [
            {
                "type": 0,
                "position": {
                    "x": 2.9000000953674318,
                    "y": 0.0
                },
                "scale": {
                    "x": 1.0,
                    "y": 1.0
                },
                "rotation": 90.0,
                "strength": 1.0
            }
        ],
        "blockList": [
            {
                "size": {
                    "x": 20.0,
                    "y": 4.0
                },
                "position": {
                    "x": 0.2385958433151245,
                    "y": -2.233276844024658
                },
                "scale": {
                    "x": 1.0,
                    "y": 1.0
                },
                "rotation": 0.0
            }
        ]
    },
    {
        name: 'Level2',
        userId: 'pruebaUserId',
        world: 'prueba',
        levelId: 2,
        starsTarget: 2,
        timeTarget: 45,
        obstacleList: [],
        ballList: [],
        exitList: [],
        flowList: [],
        blockList: [],
    },
];

const seedDB = async () => {
    await connectDB();

    try {
        await Level.deleteMany();
        await Level.insertMany(seedLevels);
        console.log('Database seeded with levels');
    } catch (error) {
        console.error('Failed seeding levels:', error);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
};

seedDB();
