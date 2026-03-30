import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as VKStrategy } from 'passport-vkontakte';
import User from '../models/User.ts';
import type { IUser } from '../models/User.ts';
import dotenv from 'dotenv';

dotenv.config();

// Serialize user into session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email or password' });
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Incorrect email or password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/api/auth/google/callback`,
        passReqToCallback: true,
      },
      async (req: any, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ 'oauth.google.id': profile.id });
          if (existingUser) return done(null, existingUser);

          const email = profile.emails?.[0]?.value;
          if (email) {
            const userWithEmail = await User.findOne({ email });
            if (userWithEmail) {
              userWithEmail.oauth.google = { id: profile.id, email };
              await userWithEmail.save();
              return done(null, userWithEmail);
            }
          }

          const newUser = new User({
            email: email || `${profile.id}@google.com`,
            profile: {
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value || '',
            },
            oauth: { google: { id: profile.id, email: email || '' } },
          });
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

// Twitter Strategy
if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  passport.use(
    new TwitterStrategy(
      {
        clientID: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/api/auth/twitter/callback`,
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          const existingUser = await User.findOne({ 'oauth.twitter.id': profile.id });
          if (existingUser) return done(null, existingUser);

          const newUser = new User({
            email: `${profile.id}@twitter.com`,
            profile: {
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value || '',
              socialLinks: { twitter: `https://twitter.com/${profile.username}` },
            },
            oauth: { twitter: { id: profile.id, username: profile.username } },
          });
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

// Facebook Strategy
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/api/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ 'oauth.facebook.id': profile.id });
          if (existingUser) return done(null, existingUser);

          const email = profile.emails?.[0]?.value;
          const newUser = new User({
            email: email || `${profile.id}@facebook.com`,
            profile: {
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value || '',
            },
            oauth: { facebook: { id: profile.id, email: email || '' } },
          });
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

// VK Strategy
if (process.env.VK_CLIENT_ID && process.env.VK_CLIENT_SECRET) {
  passport.use(
    new VKStrategy(
      {
        clientID: process.env.VK_CLIENT_ID,
        clientSecret: process.env.VK_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/api/auth/vk/callback`,
      },
      async (accessToken: string, refreshToken: string, params: any, profile: any, done: any) => {
        try {
          const existingUser = await User.findOne({ 'oauth.vk.id': profile.id });
          if (existingUser) return done(null, existingUser);

          const newUser = new User({
            email: `${profile.id}@vk.com`,
            profile: {
              name: profile.displayName,
              avatar: profile.photos?.[0]?.value || '',
            },
            oauth: { vk: { id: profile.id } },
          });
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

export default passport;
