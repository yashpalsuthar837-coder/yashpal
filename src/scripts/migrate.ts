import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const migrateUsers = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-app';
    await mongoose.connect(mongoURI);

    // Add new fields to all users if they don't exist
    const result = await User.updateMany(
      {},
      {
        $set: {
          'settings.twoFactorEnabled': false,
          'profile.socialLinks.facebook': '',
          'profile.socialLinks.vk': '',
        },
      },
      { upsert: false }
    );

    console.log(`Migrated ${result.modifiedCount} users`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error during migration:', err);
    process.exit(1);
  }
};

migrateUsers();
