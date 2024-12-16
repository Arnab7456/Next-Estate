import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connect = async (): Promise<void> => {
  mongoose.set('strictQuery', true);
  
  // Check if MongoDB is already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  // Fetch the MongoDB URI from environment variables
  const mongoUri = process.env.MONGODB;
  if (!mongoUri) {
    throw new Error('MONGODB is not defined in the environment variables');
  }

  try {
    // Connect to MongoDB with dbName 'next-estate'
    await mongoose.connect(mongoUri, {
      dbName: 'next-estate',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};