# Auth & Profile System Setup Guide

This guide explains how to set up the OAuth providers and environment variables for the application.

## 1. OAuth Provider Setup

### Google Auth
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**.
5. Select **Web application**.
6. Add **Authorized redirect URIs**:
   - `https://ais-dev-avsem7dzayfi6z6wmddnxn-181061418182.asia-east1.run.app/api/auth/google/callback`
   - `https://ais-pre-avsem7dzayfi6z6wmddnxn-181061418182.asia-east1.run.app/api/auth/google/callback`
7. Copy the **Client ID** and **Client Secret**.

### X (Twitter) Auth
1. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).
2. Create a new App.
3. In **App settings**, enable **User authentication settings**.
4. Select **OAuth 2.0**.
5. Select **Web App, Automated App or Bot**.
6. Add **Callback URI / Redirect URL**:
   - `https://ais-dev-avsem7dzayfi6z6wmddnxn-181061418182.asia-east1.run.app/api/auth/twitter/callback`
7. Copy the **Client ID** and **Client Secret**.

### Facebook Auth
1. Go to the [Meta for Developers](https://developers.facebook.com/).
2. Create a new App.
3. Add **Facebook Login** product.
4. In **Settings > Basic**, copy the **App ID** and **App Secret**.
5. In **Facebook Login > Settings**, add **Valid OAuth Redirect URIs**:
   - `https://ais-dev-avsem7dzayfi6z6wmddnxn-181061418182.asia-east1.run.app/api/auth/facebook/callback`

### VK Auth
1. Go to the [VK Developers](https://vk.com/dev).
2. Create a new App.
3. In **Settings**, copy the **App ID** and **Secure Key**.
4. Add **Authorized redirect URI**:
   - `https://ais-dev-avsem7dzayfi6z6wmddnxn-181061418182.asia-east1.run.app/api/auth/vk/callback`

## 2. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# App URL
APP_URL=https://ais-dev-avsem7dzayfi6z6wmddnxn-181061418182.asia-east1.run.app

# MongoDB
MONGODB_URI=mongodb://localhost:27017/auth-app

# Session
SESSION_SECRET=your-very-secret-session-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Twitter OAuth
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# VK OAuth
VK_CLIENT_ID=your-vk-client-id
VK_CLIENT_SECRET=your-vk-client-secret

# Cloudinary (Optional for avatar upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 3. Database Seeding

To create the initial admin user, run:
```bash
npx tsx src/scripts/seed.ts
```
Default admin credentials:
- **Email:** `admin@example.com`
- **Password:** `AdminPassword123!`

## 4. Running the App

```bash
npm run dev
```
