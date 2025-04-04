import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventRoutes from './routes/events';
import reportRoutes from './routes/report';
import feedbackRoutes from './routes/feedback';
import playerProgressRoutes from './routes/playerProgress';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/events', eventRoutes);
app.use('/report', reportRoutes)
app.use('/feedback', feedbackRoutes)
app.use('/playerProgress', playerProgressRoutes)

export default app;
