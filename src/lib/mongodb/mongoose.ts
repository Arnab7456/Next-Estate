import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {
  
  mongoose.set('strictQuery', true);

  
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }
  
  const mongoUri = process.env.MONGODB;
  if (!mongoUri) {
    throw new Error('MONGODB is not defined in the environment variables');
  }

  
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'next-estate',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
