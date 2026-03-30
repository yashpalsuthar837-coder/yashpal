import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import User from '../models/User.ts';
import type { IUser } from '../models/User.ts';
import ActivityLog from '../models/ActivityLog.ts';
import { authRateLimiter, validateInput } from '../middleware/security.ts';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

const router = express.Router();

// Signup
router.post('/signup', authRateLimiter, validateInput, async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({
      email,
      hashedPassword: password,
      profile: { name },
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', authRateLimiter, (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (err: any, user: IUser, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message || 'Login failed' });

    req.login(user, async (err) => {
      if (err) return next(err);

      // Log activity
      await ActivityLog.create({
        userId: user._id,
        ipAddress: req.ip,
        device: req.headers['user-agent'] || 'unknown',
        provider: 'email',
      });

      res.json({
        message: 'Logged in successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.profile.name,
          role: user.role,
          twoFactorEnabled: user.settings.twoFactorEnabled,
        },
      });
    });
  })(req, res, next);
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
});

// OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile');
});

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile');
});

router.get('/vk', passport.authenticate('vkontakte'));
router.get('/vk/callback', passport.authenticate('vkontakte', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile');
});

// 2FA Routes
router.post('/2fa/setup', async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
  const user = req.user as IUser;

  const secret = speakeasy.generateSecret({ name: `AuthApp (${user.email})` });
  user.settings.twoFactorSecret = secret.base32;
  await user.save();

  const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url || '');
  res.json({ qrCodeUrl, secret: secret.base32 });
});

router.post('/2fa/verify', async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
  const { token } = req.body;
  const user = req.user as IUser;

  const verified = speakeasy.totp.verify({
    secret: user.settings.twoFactorSecret!,
    encoding: 'base32',
    token,
  });

  if (verified) {
    user.settings.twoFactorEnabled = true;
    await user.save();
    res.json({ message: '2FA enabled successfully' });
  } else {
    res.status(400).json({ error: 'Invalid token' });
  }
});

export default router;
