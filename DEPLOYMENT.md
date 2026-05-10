# Vercel Deployment Guide

This application is ready to be deployed on Vercel. Follow these steps:

## Prerequisites

- A GitHub account with this repository
- A [Vercel account](https://vercel.com/signup)
- A [Firebase project](https://console.firebase.google.com) with:
  - Authentication enabled (Google Sign-In)
  - Firestore Database
  - Web app configuration

## Setup Instructions

### 1. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** > **Your Apps** > **Web**
4. Copy the Firebase configuration values (API Key, Auth Domain, Project ID, etc.)

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. In the "Environment Variables" section, add:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `GOOGLE_GENKIT_API_KEY` (optional)
6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to Vercel (follow prompts to link project)
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Repeat for all other environment variables

# Deploy with environment variables
vercel --prod
```

### 3. Configure Firebase Security Rules

For production, update your Firebase Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read wishes
    match /wishes/{document=**} {
      allow read: if true;
      // Only authenticated users can write
      allow create: if request.auth != null;
      // Users can only delete their own wishes (if you implement this)
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### 4. Configure Authentication

In Firebase Console, ensure Google Sign-In is enabled:
1. Go to **Authentication** > **Sign-in method**
2. Enable **Google**
3. Add your Vercel domain to authorized domains:
   - `your-project.vercel.app`
   - `www.your-project.vercel.app`

## Environment Variables Reference

See `.env.example` for all available environment variables and their descriptions.

## Troubleshooting

### Build fails with TypeScript errors
- Make sure all environment variables are set correctly
- Run `npm run typecheck` locally to find issues

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Check that `node_modules` is in `.gitignore`

### Firebase authentication not working
- Verify environment variables are set in Vercel dashboard
- Check that your domain is added to Firebase authorized domains
- Ensure Google Sign-In is enabled in Firebase Console

### Firestore rules error
- Update the Firestore security rules as shown above
- Allow proper access for your use case

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Create .env.local with your Firebase credentials
# (Copy from .env.example and fill in values)

# Run development server
npm run dev

# Build and test production build locally
npm run build
npm start
```

## Monitoring

After deployment:
1. Check Vercel deployment logs: Go to your project in Vercel dashboard
2. Monitor Firebase usage: Go to Firebase Console > Usage
3. Review Firestore rules: Firebase Console > Firestore > Rules

## Security Considerations

- ✅ All Firebase keys in this project are `NEXT_PUBLIC_` - they're safe to expose
- ✅ Never commit `.env.local` to version control
- ✅ Set strong Firestore security rules to protect user data
- ✅ Regularly review Firebase security rules and access

## Support

For issues with:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Firebase**: Check [Firebase Documentation](https://firebase.google.com/docs)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
