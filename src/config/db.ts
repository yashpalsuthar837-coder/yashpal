import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;
    
    // Check if URI is valid, otherwise use default
    if (!mongoURI || (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://'))) {
      console.warn('Invalid or missing MONGODB_URI. Falling back to local default.');
      mongoURI = 'mongodb://localhost:27017/auth-app';
    }
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Don't exit process, just log error so the server can still start and report status
  }
};

export default connectDB;
