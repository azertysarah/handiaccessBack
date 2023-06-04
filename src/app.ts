import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import placeRoutes from './routes/place';
import reviewRoutes from './routes/review';

dotenv.config();

// Connection to our database
mongoose.connect('mongodb+srv://sarah:Pe0f2auTRACXdKJk@cluster0.ijt3hoy.mongodb.net/handiaccess')
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Error while connecting to the database'))
const app = express();

// Enable CORS
const origin = {
    origin: '*',
    credentials: true
};
app.use(cors(origin));
app.options('*', cors(origin));

app.use(express.json());

// Routes
app.use('/places', placeRoutes);
app.use('/reviews', reviewRoutes);

export default app;