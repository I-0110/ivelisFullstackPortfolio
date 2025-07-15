import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start server AFTER DB connects
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const MONGODB_URI = process.env.MONGODB_URI || '';
console.log('Connected to MongoDB:', process.env.MONGO_URI);

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;
