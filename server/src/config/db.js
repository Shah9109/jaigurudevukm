import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 */
export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jaigurudev_db';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    mongoose.set('bufferCommands', false);
    console.warn(`[Database Info] MongoDB connection not available at ${mongoURI}. Running with offline/in-memory fallback.`);
    return null;
  }
};
