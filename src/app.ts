import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventRoutes from './routes/gameSession';
import reportRoutes from './routes/report';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/events', eventRoutes);
app.use('/report', reportRoutes)

export default app;
