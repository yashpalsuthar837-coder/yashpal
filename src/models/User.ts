import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  hashedPassword?: string;
  profile: {
    name: string;
    bio: string;
    avatar: string;
    socialLinks: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      facebook?: string;
      vk?: string;
    };
  };
  oauth: {
    google?: { id: string; email: string };
    twitter?: { id: string; username: string };
    facebook?: { id: string; email?: string };
    vk?: { id: string };
  };
  role: 'user' | 'admin';
  settings: {
    isPublic: boolean;
    emailVisible: boolean;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hashedPassword: { type: String },
    profile: {
      name: { type: String, default: '' },
      bio: { type: String, default: '' },
      avatar: { type: String, default: '' },
      socialLinks: {
        github: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        facebook: { type: String, default: '' },
        vk: { type: String, default: '' },
      },
    },
    oauth: {
      google: { id: String, email: String },
      twitter: { id: String, username: String },
      facebook: { id: String, email: String },
      vk: { id: String },
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    settings: {
      isPublic: { type: Boolean, default: true },
      emailVisible: { type: Boolean, default: false },
      twoFactorEnabled: { type: Boolean, default: false },
      twoFactorSecret: { type: String },
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (this: IUser, next: any) {
  if (!this.isModified('hashedPassword') || !this.hashedPassword) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  if (!this.hashedPassword) return Promise.resolve(false);
  return bcrypt.compare(password, this.hashedPassword);
};

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ 'oauth.google.id': 1 });
UserSchema.index({ 'oauth.twitter.id': 1 });
UserSchema.index({ 'oauth.facebook.id': 1 });
UserSchema.index({ 'oauth.vk.id': 1 });

export default mongoose.model<IUser>('User', UserSchema);
