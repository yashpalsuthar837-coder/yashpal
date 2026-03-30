import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

// Rate limiting for login/signup
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Security headers with Helmet
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://picsum.photos"],
      connectSrc: ["'self'", "https://api.cloudinary.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Input validation and sanitization middleware
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name, bio } = req.body;

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (password) {
    // Password strength requirements: min 8 chars, at least one uppercase, one lowercase, one number, one special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
      });
    }
  }

  if (name) {
    req.body.name = validator.escape(name.trim());
  }

  if (bio) {
    req.body.bio = validator.escape(bio.trim());
  }

  next();
};

// CSRF Protection (Simplified for this environment - usually we'd use csurf or similar)
// But Helmet already provides some protection. For a real app, we'd use double-submit cookies or similar.
