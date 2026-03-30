import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-app';
    await mongoose.connect(mongoURI);

    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      const admin = new User({
        email: adminEmail,
        hashedPassword: 'AdminPassword123!',
        profile: {
          name: 'System Administrator',
          bio: 'I manage the system.',
        },
        role: 'admin',
        settings: {
          isPublic: true,
          emailVisible: true,
          twoFactorEnabled: false,
        },
      });
      await admin.save();
      console.log('Admin user created successfully');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
