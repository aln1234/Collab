# Connect

## Project Overview

Connect is a creator economy marketplace MVP. Brands create paid creator campaigns, creators apply and submit content, and brands review approvals while payment status is tracked manually for the MVP.

The project now has a Next.js web app and an Expo React Native mobile app. Both clients use the same Django REST API.

## Current MVP Goal

Creator finds campaign -> applies -> brand approves -> creator submits content -> brand approves or requests revision -> payment status is manually tracked.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Django
- Django REST Framework
- PostgreSQL
- JWT Auth with SimpleJWT
- Django Admin
- Docker
- Expo React Native
- Expo Router
- Expo SecureStore

## Project Structure

```text
connect/
  web/
    src/app/
      (public)/
      (auth)/
      (creator)/
      (brand)/
      (admin)/
    src/components/
    src/features/
    src/lib/
    src/hooks/
    src/types/
    src/config/
    package.json
    .env.example
  mobile/
    app/
      (auth)/
      (brand)/
      (creator)/
      (admin)/
      _layout.tsx
      index.tsx
    src/
      components/
      features/
      lib/
      stores/
      types/
    package.json
    .env.example
  backend/
    config/
      settings/
      urls.py
      wsgi.py
      asgi.py
    apps/
      accounts/
      brands/
      creators/
      campaigns/
      applications/
      submissions/
      payments/
      notifications/
      core/
    media/
    static/
    manage.py
    requirements.txt
    .env.example
  docs/
    PROJECT_STATUS.md
    FLOW.md
    TROUBLESHOOTING.md
  docker-compose.yml
  README.md
  .gitignore
```

## Completed So Far

### Root Setup

- [x] Monorepo structure exists with `web/` and `backend/`
- [x] Root `docker-compose.yml` exists
- [x] Root `.gitignore` exists
- [x] Root README exists
- [x] `docs/` project documentation folder exists

### Backend Setup

- [x] Django project exists under `backend/`
- [x] Settings are split into `base.py`, `development.py`, and `production.py`
- [x] DRF is installed and configured
- [x] CORS is installed and configured
- [x] SimpleJWT is installed and configured
- [x] drf-spectacular is installed and configured
- [x] Health endpoint exists
- [x] All expected app folders exist
- [x] Main marketplace models exist
- [x] Serializers exist
- [x] Views exist
- [x] App URL files exist
- [x] Admin registrations exist
- [x] Initial migrations exist
- [x] `python manage.py check` passes
- [x] Environment helpers exist for strings, booleans, and comma-separated lists
- [x] Backend console logging is configured for readable Docker logs
- [x] DRF API errors use a consistent response shape
- [x] Missing or short development `SECRET_KEY` values no longer trigger the SimpleJWT key-length warning

### Frontend Setup

- [x] Next.js App Router app exists under `web/`
- [x] TypeScript is configured
- [x] Tailwind CSS is configured
- [x] ESLint is configured
- [x] Mobile-first route groups exist
- [x] Reusable UI/layout components exist
- [x] API client exists
- [x] Token storage abstraction exists
- [x] Zustand auth store exists
- [x] React Query provider exists
- [x] Public, auth, creator, brand, and admin pages exist
- [x] Frontend auth is wired to live backend auth endpoints
- [x] Protected route behavior exists for brand, creator, and admin areas
- [x] Frontend API errors are normalized into a user-friendly shape
- [x] App-level loading, not-found, and error screens exist
- [x] Navbar/header reacts to authenticated state and shows Sign out
- [x] Brand, creator, and admin dashboards show live authenticated user context
- [x] Campaign list/detail/create/edit screens use live backend data through React Query
- [x] Creator campaign browse, detail, apply, and applications pages use live backend data
- [x] Sonner is configured for global toast notifications
- [x] `npm run lint` passes

### Mobile Setup

- [x] Expo React Native app exists under `mobile/`
- [x] Expo Router is configured
- [x] TypeScript is configured
- [x] React Query is configured
- [x] Zustand auth store exists
- [x] JWT tokens are stored with Expo SecureStore
- [x] Mobile API client connects to the existing Django API
- [x] Mobile login/register use live backend auth endpoints
- [x] Mobile role redirects exist for brand, creator, and admin users
- [x] Brand, creator, and admin mobile dashboards show live authenticated user context
- [x] Mobile toast notifications are configured with `react-native-toast-message`
- [x] `npm run lint` passes in `mobile/`

### Database Setup

- [x] PostgreSQL service exists in Docker Compose
- [x] Backend service depends on healthy PostgreSQL
- [x] Database URL is environment-driven
- [x] Initial migrations apply in Docker

### Authentication

- [x] Custom `User` model exists
- [x] User roles exist: `BRAND`, `CREATOR`, `ADMIN`
- [x] Register endpoint exists
- [x] JWT token and refresh endpoints exist
- [x] `/api/auth/me/` exists
- [x] Login stores tokens, loads `/api/auth/me/`, saves user state, and redirects by role
- [x] Register creates the user, logs in, loads `/api/auth/me/`, saves user state, and redirects by role
- [x] Existing token initialization loads `/api/auth/me/` or clears invalid tokens
- [x] Auth store centralizes sign in, sign up, token hydration, and logout
- [x] Sign out clears tokens, resets auth state, shows a toast, and redirects

### Campaign Flow

- [x] Campaign model exists
- [x] Campaign serializer exists
- [x] Campaign list/create/detail/update views exist
- [x] Campaign service and selector files exist
- [x] Backend API paths are aligned with the intended frontend contract
- [x] Public campaign list/detail pages use live backend campaign data
- [x] Brand campaign list uses live brand-owned campaign data
- [x] Brand campaign create, detail, and edit pages are wired to backend CRUD endpoints
- [ ] Full browser-tested campaign CRUD flow still needs a manual pass

### Creator Flow

- [x] Creator profile model exists
- [x] Creator profile API view exists
- [x] Creator dashboard/profile/applications/submissions/payments pages exist
- [x] Creator campaign browse and detail pages use live campaign data
- [x] Creator apply flow posts to the live backend and prevents duplicate applications in the UI
- [x] Creator applications page uses live backend data
- [ ] Creator submissions/payments still use static sample data
- [ ] Creator content submission flow needs end-to-end UI wiring

### Brand Flow

- [x] Brand profile model exists
- [x] Brand profile API view exists
- [x] Brand dashboard/profile/campaigns/applications/submissions/payments pages exist
- [ ] Brand pages still use static sample marketplace data outside live auth context
- [ ] Brand approval/revision/payment actions need end-to-end UI wiring

### Admin Flow

- [x] Django Admin is enabled
- [x] Marketplace models are registered in Django Admin
- [ ] Disputes are handled manually only; there is no `Dispute` model yet

### Documentation

- [x] Root README updated
- [x] Detailed project status doc created
- [x] Product flow doc created

## Still To Do

- [ ] Replace remaining non-campaign sample/static frontend data with React Query calls
- [ ] Build mobile campaign CRUD
- [ ] Build mobile creator campaign browse/apply flow
- [ ] Complete frontend forms for brand application status, submission status, and payment status updates
- [ ] Add a full happy-path MVP test flow
- [ ] Expand user-friendly error/loading/empty states across marketplace pages
- [ ] Decide if disputes need a dedicated model or will remain manual admin notes for MVP
- [ ] Set a real non-empty `SECRET_KEY` in `backend/.env`

## Application Flow

### Brand Flow

Brand registers/logs in -> creates brand profile -> creates campaign -> reviews creator applications -> approves/rejects creators -> reviews content submissions -> approves content or requests revision -> tracks payment status manually.

### Creator Flow

Creator registers/logs in -> creates creator profile -> browses campaigns -> applies to campaign -> waits for approval -> submits content -> receives approval or revision request -> tracks payment status.

### Admin Flow

Admin logs into Django Admin -> manages users -> manages campaigns -> manages applications -> manages submissions -> manages payments -> manages disputes/issues manually.

### API Flow

The intended frontend API flow is:

1. Auth screens call register, token, refresh, and me endpoints.
2. Profile screens call brand or creator profile endpoints.
3. Campaign screens list, create, and update campaigns.
4. Creator browses open campaigns and applies to a campaign.
5. Brand updates application status.
6. Creator submits content after approval.
7. Brand updates submission status.
8. Payment record is tracked manually after approved content.

Campaign CRUD is now live on the web app:

- Public campaign browsing calls `GET /api/campaigns/`.
- Public campaign detail calls `GET /api/campaigns/:id/`.
- Brand campaign management calls `GET /api/campaigns/?mine=true`.
- Brand campaign creation calls `POST /api/campaigns/`.
- Brand campaign editing calls `PATCH /api/campaigns/:id/`.
- Creator campaign browsing calls `GET /api/campaigns/`.
- Creator campaign detail calls `GET /api/campaigns/:id/`.
- Creator application status checks call `GET /api/creator/applications/`.
- Creator apply calls `POST /api/campaigns/:id/apply/`.

## API Endpoints

Status meanings:

- Done: route exists at the intended clean API path and imports successfully.
- In progress: backend code exists but frontend wiring or end-to-end behavior needs more work.
- Pending: not implemented yet.

| Status | Intended Endpoint | Current Notes |
|---|---|---|
| [x] | `GET /api/health/` | Returns status, product, and environment |
| [x] | `POST /api/auth/register/` | Implemented |
| [x] | `POST /api/auth/token/` | Implemented through SimpleJWT |
| [x] | `POST /api/auth/token/refresh/` | Implemented through SimpleJWT |
| [x] | `GET /api/auth/me/` | Implemented |
| [x] | `GET/PUT /api/brand/profile/` | Implemented |
| [x] | `GET/PUT /api/creator/profile/` | Implemented |
| [x] | `GET /api/campaigns/` | Implemented |
| [x] | `POST /api/campaigns/` | Implemented |
| [x] | `GET /api/campaigns/:id/` | Implemented |
| [x] | `PATCH /api/campaigns/:id/` | Implemented |
| [x] | `POST /api/campaigns/:id/apply/` | Implemented |
| [x] | `GET /api/creator/applications/` | Implemented |
| [x] | `GET /api/brand/applications/` | Implemented |
| [x] | `PATCH /api/applications/:id/status/` | Implemented |
| [x] | `POST /api/campaigns/:id/submissions/` | Implemented |
| [x] | `GET /api/creator/submissions/` | Implemented |
| [x] | `GET /api/brand/submissions/` | Implemented |
| [x] | `PATCH /api/submissions/:id/status/` | Implemented |
| [x] | `GET /api/payments/` | Implemented |
| [x] | `PATCH /api/payments/:id/status/` | Implemented |
| [x] | `GET /api/notifications/` | Implemented |
| [x] | `PATCH /api/notifications/:id/read/` | Implemented |
| [x] | `GET /api/schema/` | Implemented |
| [x] | `GET /api/docs/` | Implemented |

## How to Run Locally

Start the database:

```bash
docker compose up db
```

Run the backend in Docker:

```bash
docker compose up --build backend
```

Or run the backend locally:

```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Run migrations:

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

Create a superuser:

```bash
cd backend
python manage.py createsuperuser
```

Create local demo users:

```bash
cd backend
python manage.py seed_demo_users
```

Or in Docker:

```bash
docker compose exec backend python manage.py seed_demo_users
```

Run the web app:

```bash
cd web
npm install
npm run dev
```

Run the mobile app:

```bash
cd mobile
npm install
npm run start
```

You can also run:

```bash
cd mobile
npx expo start
```

Mobile API base URL examples:

- Web browser or iOS simulator: `http://localhost:8000/api`
- Android emulator: `http://10.0.2.2:8000/api`
- Physical phone: `http://YOUR_COMPUTER_LAN_IP:8000/api`

Set this in `mobile/.env`:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Useful URLs:

- Web app: `http://localhost:3000`
- Mobile app: run through Expo with `npm run start`
- API health: `http://localhost:8000/api/health/`
- API docs: `http://localhost:8000/api/docs/`
- Django Admin: `http://localhost:8000/admin/`

## Demo Users For Local Testing

Run `python manage.py seed_demo_users` from `backend/` or `docker compose exec backend python manage.py seed_demo_users` from the project root.

These accounts are for local development only:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@connect.test` | `ConnectDemo123!` |
| Brand | `brand@connect.test` | `ConnectDemo123!` |
| Creator | `creator@connect.test` | `ConnectDemo123!` |

The command also creates or updates simple demo brand and creator profiles.

## Testing Auth Locally

1. Start the backend and web or mobile app.
2. Register or log in from `/register` or `/login`.
3. Confirm `/api/auth/me/` returns `200` with the current user.
4. Confirm the web navbar or mobile screen changes to the authenticated state.
5. Confirm the role dashboard says `Welcome back` with the current user name or email.
6. Click Sign out.
7. Confirm access and refresh tokens are removed from localStorage on web or SecureStore on mobile.
8. Confirm the app returns to the signed-out state.

## Troubleshooting

If the backend logs show `InsecureKeyLengthWarning`, the Django `SECRET_KEY` is missing or too short for JWT signing. Generate a secure key and place it in `backend/.env`:

```bash
cd backend
python - << 'PY'
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
PY
```

Then set:

```bash
SECRET_KEY=your-generated-secret-key
```

Inspect Docker logs:

```bash
docker compose logs backend --tail=100
docker compose logs web --tail=100
docker compose logs db --tail=100
```

For a fuller guide, see `docs/TROUBLESHOOTING.md`.

## Development Notes

- The web app is mobile-first and remains the primary complete frontend.
- The Expo mobile app currently covers auth and role dashboards only.
- Stripe is not included yet.
- Celery/Redis is not included yet.
- AI matching is not included yet.
- Payment is manual tracking for MVP.
- Local media storage is used first; S3 or Cloudflare R2 can be added later.
- Sonner is used for global web toast notifications.
- `react-native-toast-message` is used for global mobile toast notifications.

## Next Development Steps

1. Finish brand/creator profile live data loading and save states on web.
2. Browser-test campaign CRUD as brand from create -> detail -> edit.
3. Browser-test creator campaign browse/apply and duplicate application states.
4. Finish brand application approval/rejection flow on web.
5. Finish creator content submission flow on web.
6. Finish brand content approval/revision flow on web.
7. Finish manual payment tracking UI on web.
8. Add mobile campaign browsing and campaign CRUD.
9. Replace remaining non-campaign/application sample/static frontend data with React Query calls.
10. Test full MVP flow.
