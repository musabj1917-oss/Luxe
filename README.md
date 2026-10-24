# Besties Messenger - Mobile Application

Besties Messenger is a Snapchat-inspired mobile app built with React Native, Expo, TypeScript, Expo Router, and Neon PostgreSQL.

## 💛 Snapchat-Inspired Design & Color Palette
- **Primary Color**: Snapchat Yellow (`#FFFC00`)
- **Background**: Dark Theme (`#000000`, `#121212`, `#1E1E1E`)
- **Typography & Icons**: `@expo/vector-icons` (Ionicons)

---

## 🛠️ Technology Stack
- **Framework**: React Native, Expo (SDK 51), TypeScript
- **Navigation**: Expo Router (File-based tabs and stacks)
- **Database**: Neon PostgreSQL
- **Backend**: Express + Node.js server (`server/index.ts`)
- **Authentication**: Google OAuth token integration & Invitation-only registration
- **Free Tier Compatible**: All cloud and local components run on free-tier services without mandatory credit cards.

---

## 🚀 Features Implemented

1. **Invitation-Only Sign-In & Username Setup** (`app/auth.tsx`)
   - Google OAuth authentication flow
   - Invitation code verification (e.g., `BESTIES`)
   - Unique username assignment
   - Mandatory privacy disclosure acceptance

2. **30-Minute Disappearing Messages & Protected Admin Archive** (`app/(tabs)/chats.tsx`, `app/chat/[id].tsx`)
   - Real-time private and group text, emoji, photo, video, and voice messages
   - Server-enforced 30-minute expiration countdown
   - Protected server-side media archive table for future admin dashboard retention

3. **Snapchat-Style Camera & 24-Hour Expiring Stories** (`app/(tabs)/index.tsx`)
   - Photo/video snap capture interface
   - 24-hour expiring stories feed

4. **Friends, Invitations & Friend Score Leaderboard** (`app/(tabs)/friends.tsx`)
   - Unique invite link/code generation
   - Friend requests and search by username
   - Mutual streak counters (🔥 5-day streak)
   - Friend Score calculation and leaderboard toggle

5. **Opt-in Live Location Sharing** (`app/(tabs)/location.tsx`)
   - Map/radar view of approved besties
   - Last update timestamps
   - Live stream controls: Pause, Resume, and Stop Sharing

6. **Decoy PIN Mode & Security Controls** (`app/(tabs)/profile.tsx`)
   - Optional 4-digit decoy PIN
   - Displays isolated fictional demo conversations without touching real user chats
   - Profile settings, score visibility toggle, clear admin retention policy, and permanent account deletion

---

## 📊 Neon PostgreSQL Schema (`server/db/schema.sql`)
Normalized PostgreSQL tables created for:
- `users`
- `profiles`
- `invitations`
- `friendships`
- `conversations`
- `conversation_participants`
- `messages`
- `media_archive`
- `stories`
- `reactions`
- `location_permissions`
- `location_updates`
- `reports`
- `audit_logs`

---

## 🔑 Environment Variables

To connect to a live Neon PostgreSQL database and custom Google OAuth app, set the following environment variables in a `.env` file:

```env
DATABASE_URL=postgres://user:password@ep-cool-site-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

---

## 📱 Running the Project locally

### 1. Start the API Server
```bash
npm run dev:server
```

### 2. Start Expo Mobile App (Android / iOS / Web)
```bash
npm start
```
- Open Expo Go on Android or iOS simulator to test live.

### 3. Run Tests
```bash
npm test
npm run typecheck
```
