# LanguageTalk.live

Deploy-ready Next.js + Tailwind + Supabase language-exchange starter with Google OAuth, profiles, authenticated user discovery, realtime chat, translation and Daily video calls.

## 1. Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Supabase

Create a Supabase project. Run `supabase/schema.sql` in SQL Editor. In Auth > Providers, enable Google. Add your local callback URL and production callback URL as allowed redirect URLs, e.g. `http://localhost:3000/auth/callback` and `https://languagetalk.live/auth/callback`.

Use the current Supabase Project URL and Publishable key in `.env.local`.

## 3. Google Cloud Translation

Enable Cloud Translation API and provide `GOOGLE_CLOUD_PROJECT_ID` and `GOOGLE_TRANSLATE_API_KEY`. The translate route keeps the API key server-side.

## 4. Daily video

Create a Daily account/API key and set `DAILY_API_KEY`. The server route creates a private, two-person room and a meeting token. Do not expose this key in browser code.

## 5. Deploy

Vercel is a simple deployment target. Set all `.env.local` values as project environment variables and set `NEXT_PUBLIC_APP_URL` to `https://languagetalk.live`. Add the production OAuth callback in Supabase.

## Safety notes

This starter intentionally keeps the app behind authentication. Before opening it to the public, add report/block, moderation, rate limits, abuse monitoring, and a clear age/safety policy. Do not expose users' email addresses in public profiles.
