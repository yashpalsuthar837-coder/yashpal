import express, { Request, Response } from 'express';
import User from '../models/User.ts';
import type { IUser } from '../models/User.ts';
import ActivityLog from '../models/ActivityLog.ts';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { validateInput } from '../middleware/security.ts';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Multer setup for local storage (fallback if Cloudinary is not configured)
const upload = multer({ dest: 'uploads/' });

// Cloudinary configuration
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Middleware to check authentication
const isAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
};

// Get current user profile
router.get('/me', isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user as IUser;
  res.json({
    id: user._id,
    email: user.email,
    profile: user.profile,
    settings: user.settings,
    role: user.role,
    oauth: user.oauth,
  });
});

// Update profile
router.post('/update', isAuthenticated, validateInput, async (req: Request, res: Response) => {
  const { name, bio, socialLinks } = req.body;
  const user = req.user as IUser;

  try {
    if (name) user.profile.name = name;
    if (bio) user.profile.bio = bio;
    if (socialLinks) user.profile.socialLinks = { ...user.profile.socialLinks, ...socialLinks };

    await user.save();
    res.json({ message: 'Profile updated successfully', profile: user.profile });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload avatar
router.post('/upload-avatar', isAuthenticated, upload.single('avatar'), async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const user = req.user as IUser;

  try {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
        transformation: [{ width: 200, height: 200, crop: 'fill' }],
      });
      user.profile.avatar = result.secure_url;
    } else {
      // Local storage fallback (not recommended for production but works for demo)
      user.profile.avatar = `/uploads/${req.file.filename}`;
    }

    await user.save();
    res.json({ message: 'Avatar uploaded successfully', avatar: user.profile.avatar });
  } catch (err) {
    res.status(500).json({ error: 'Avatar upload failed' });
  }
});

// Change password
router.post('/change-password', isAuthenticated, validateInput, async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user as IUser;

  try {
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect old password' });

    user.hashedPassword = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get activity log
router.get('/activity-log', isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user as IUser;
  try {
    const logs = await ActivityLog.find({ userId: user._id }).sort({ loginTime: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get public profile
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.settings.isPublic) {
      return res.status(404).json({ error: 'Profile not found or private' });
    }

    res.json({
      name: user.profile.name,
      bio: user.profile.bio,
      avatar: user.profile.avatar,
      socialLinks: user.profile.socialLinks,
      email: user.settings.emailVisible ? user.email : undefined,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Account settings
router.post('/settings', isAuthenticated, async (req: Request, res: Response) => {
  const { isPublic, emailVisible } = req.body;
  const user = req.user as IUser;

  try {
    if (typeof isPublic === 'boolean') user.settings.isPublic = isPublic;
    if (typeof emailVisible === 'boolean') user.settings.emailVisible = emailVisible;

    await user.save();
    res.json({ message: 'Settings updated successfully', settings: user.settings });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
