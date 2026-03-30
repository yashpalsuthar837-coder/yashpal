import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User.ts';
import ActivityLog from '../models/ActivityLog.ts';

const router = express.Router();

// Middleware to check admin role
const isAdmin = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated() && (req.user as IUser).role === 'admin') return next();
  res.status(403).json({ error: 'Forbidden: Admin access required' });
};

// Get dashboard stats
router.get('/dashboard', isAdmin, async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const recentSignups = await User.find().sort({ createdAt: -1 }).limit(5);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsersLast7Days = await ActivityLog.distinct('userId', { loginTime: { $gte: sevenDaysAgo } });

    const oauthBreakdown = await User.aggregate([
      {
        $project: {
          google: { $cond: [{ $ifNull: ['$oauth.google.id', false] }, 1, 0] },
          twitter: { $cond: [{ $ifNull: ['$oauth.twitter.id', false] }, 1, 0] },
          facebook: { $cond: [{ $ifNull: ['$oauth.facebook.id', false] }, 1, 0] },
          vk: { $cond: [{ $ifNull: ['$oauth.vk.id', false] }, 1, 0] },
          email: { $cond: [{ $ifNull: ['$hashedPassword', false] }, 1, 0] },
        },
      },
      {
        $group: {
          _id: null,
          google: { $sum: '$google' },
          twitter: { $sum: '$twitter' },
          facebook: { $sum: '$facebook' },
          vk: { $sum: '$vk' },
          email: { $sum: '$email' },
        },
      },
    ]);

    res.json({
      totalUsers,
      recentSignups: recentSignups.map((u) => ({
        id: u._id,
        email: u.email,
        name: u.profile.name,
        createdAt: u.createdAt,
      })),
      activeUsersCount: activeUsersLast7Days.length,
      oauthBreakdown: oauthBreakdown[0] || { google: 0, twitter: 0, facebook: 0, vk: 0, email: 0 },
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (paginated)
router.get('/users', isAdmin, async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments();
    res.json({ users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/users/:id', isAdmin, async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await ActivityLog.deleteMany({ userId: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Change user role
router.patch('/users/:id/role', isAdmin, async (req: Request, res: Response) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ message: 'Role updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all activity logs
router.get('/activity-logs', isAdmin, async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  try {
    const logs = await ActivityLog.find().populate('userId', 'email profile.name').skip(skip).limit(limit).sort({ loginTime: -1 });
    const total = await ActivityLog.countDocuments();
    res.json({ logs, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
