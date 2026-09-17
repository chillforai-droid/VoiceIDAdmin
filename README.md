# VoiceID Standalone Admin Panel

A separate React/Vite admin console for the existing VoiceID Supabase project.

## What it includes

- Secure Supabase Auth login + `admin_users` authorization
- Dashboard: users, online presence, messages, calls, rooms, store views/clicks
- Users: search, activity counts, suspend/activate state
- Creator Rooms: search, member/message/view counts, enable/disable, feature/unfeature
- Affiliate Store: add/edit/delete products, affiliate URL/network, active/featured, click/view counts
- Analytics: 7/30 day activity and top products/rooms
- Audit log for admin actions
- No Supabase service-role key in the browser

## Setup

1. The admin RPC/database setup has already been applied to the VoiceID Supabase project. If setting up from scratch, apply the admin SQL parts you were given in the chat.
2. Create your admin user through Supabase Auth.
3. Run the bootstrap SQL from the bottom of the migration using that user's Auth UUID:

```sql
INSERT INTO public.admin_users(user_id,role)
VALUES ('YOUR-AUTH-USER-UUID','super_admin')
ON CONFLICT (user_id) DO UPDATE SET role='super_admin',is_active=TRUE;
```

4. Copy `.env.example` to `.env` and fill in the same Supabase URL and anon key used by VoiceID.
5. From `admin-panel/` run `npm install` and `npm run dev`.
6. For production run `npm run build`; deploy the `dist/` folder as a separate static site (for example `admin.voiceid.online`).

## Security

Never add `SUPABASE_SERVICE_ROLE_KEY` to this project or expose it in Vite environment variables. Privileged operations are implemented as guarded PostgreSQL `SECURITY DEFINER` functions.

The `profiles.is_suspended` field records administrative status. The existing user app does not automatically block a suspended user unless its authentication/access flow is updated to enforce that flag.

## Vercel

Deploy `admin-panel` as a separate Vercel project. Set the project root to `admin-panel`, add the two `VITE_` environment variables, and deploy. The included `vercel.json` provides SPA fallback routing.
