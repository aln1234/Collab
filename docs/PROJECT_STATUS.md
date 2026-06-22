# Project Status

## Last Updated

2026-05-19

## Summary

Connect has a solid MVP foundation: a Next.js web app, an Expo React Native mobile app, a Django REST Framework backend, PostgreSQL through Docker Compose, JWT authentication, Django Admin, and modular marketplace apps. The backend starts, `python manage.py check` passes, API routes match the intended clean frontend contract, the web auth UI reacts to live JWT-backed user state, campaign CRUD is wired to live backend data, creators can browse open campaigns and apply on web, and the mobile app now supports live auth plus role-based dashboards.

## Completed

- Root monorepo folder exists at `connect/`.
- `web/` Next.js app exists with App Router, TypeScript, Tailwind CSS, ESLint, React Query, Zustand, and reusable components.
- `mobile/` Expo React Native app exists with TypeScript, Expo Router, React Query, Zustand, SecureStore token storage, and reusable starter components.
- `backend/` Django project exists with split settings under `config/settings/`.
- `docker-compose.yml` exists with `db` and `backend` services.
- Backend apps exist:
  - `accounts`
  - `brands`
  - `creators`
  - `campaigns`
  - `applications`
  - `submissions`
  - `payments`
  - `notifications`
  - `core`
- Main marketplace models exist:
  - `User`
  - `BrandProfile`
  - `CreatorProfile`
  - `Campaign`
  - `CampaignApplication`
  - `ContentSubmission`
  - `PaymentRecord`
  - `Notification`
- Backend serializers, views, URLs, admins, services/selectors, permissions, and migrations exist where expected.
- Health endpoint returns status, product, and environment.
- JWT token endpoints exist.
- Django Admin is enabled and model admin registrations exist.
- Web route groups and pages exist for public, auth, creator, brand, and admin areas.
- Backend API routes are aligned with the intended clean MVP contract.
- Frontend auth is wired to live backend auth endpoints.
- Brand, creator, and admin areas have role-based protected route wrappers.
- Backend environment helpers, console logging, startup warnings, and normalized DRF error responses exist.
- Frontend API errors are normalized and auth forms show visible error messages.
- App-level web loading, not-found, and error screens exist.
- Auth state is centralized in the Zustand auth store through sign in, sign up, token hydration, and logout actions.
- Navbar/header reads the auth store and shows user context, Dashboard, and Sign out when authenticated.
- Brand, creator, and admin dashboards show live authenticated user context.
- Sonner is configured as the global toast notification system.
- Campaign feature files exist for API calls, hooks, types, cards, form, status badge, and empty states.
- Public campaign list/detail screens use live React Query data.
- Brand campaign list/create/detail/edit screens use live React Query data and backend CRUD endpoints.
- Application feature files exist for API calls, hooks, types, application cards, and application status badges.
- Creator campaign browse/detail screens use live React Query data.
- Creator campaign detail checks existing creator applications and prevents duplicate apply actions.
- Creator apply flow posts to `POST /api/campaigns/:id/apply/` and invalidates application/campaign queries.
- Creator applications page uses live `GET /api/creator/applications/` data.
- Mobile app uses the existing Django auth API for login, registration, `/auth/me/`, SecureStore-backed JWT storage, and role redirects.
- Mobile brand, creator, and admin dashboards show the live authenticated user context.
- Local demo user seed command exists for admin, brand, and creator testing accounts.
- `docs/TROUBLESHOOTING.md` exists.
- `npm run lint` passes.
- `python manage.py check` passes.
- Docker Compose currently shows `db` and `backend` running.

## Partially Completed

- Frontend pages exist but some non-campaign/application marketplace metrics/lists still use sample/static data.
- Some frontend forms call API helper functions, but not all flows have complete live data wiring.
- React Query is set up and used for campaign listing, but not consistently across every page.
- Zustand auth store initializes from stored tokens, loads `/api/auth/me/`, and clears invalid tokens.
- Backend services implement core workflow rules, but full end-to-end user testing is still needed.
- API docs exist and route paths now match the intended product contract.
- A missing or short development `SECRET_KEY` now uses a generated process-local key and logs a clear warning; a stable `.env` key is still recommended.

## Missing / Not Started

- Full web frontend-to-backend happy path is not complete.
- Mobile campaign CRUD is not started.
- Mobile creator campaign browse/apply is not started.
- Mobile brand approval/revision/payment flows are not started.
- Browser-tested campaign CRUD is not complete.
- Browser-tested apply/approve/submit/review/payment flow is not complete.
- Dedicated disputes model is not present.
- Automated tests are not present.
- Stripe, Celery, Redis, AI matching, chat, analytics, cloud media storage, video processing, and advanced discovery are intentionally not started.

## Backend Status Table

| Area | Status | Notes |
|---|---|---|
| Django setup | Done | Project exists under `backend/`; `manage.py check` passes |
| Settings | Done | Split settings exist in `config/settings/`; env-driven config exists |
| Apps | Done | All expected app modules exist under `backend/apps/` |
| Models | Done | Main MVP models exist with UUID IDs and timestamps |
| Serializers | Done | Serializers exist for main API resources |
| Views | In progress | Views exist; end-to-end behavior still needs testing |
| URLs | Done | URL files expose the intended clean API paths |
| Auth | Done | JWT/register/me exist; frontend login/register hydrate user state and redirect by role |
| Demo users | Done | `seed_demo_users` creates local admin, brand, and creator accounts plus demo profiles |
| Admin | Done | Admin registrations exist for marketplace models |
| Migrations | Done | Initial migrations exist; no pending migrations detected |
| CORS | Done | `django-cors-headers` is configured |
| DRF | Done | Pagination, filtering, auth, and schema defaults are configured |
| API docs | Done | drf-spectacular schema/docs routes exist |
| Health | Done | `/api/health/` returns the expected JSON |
| Docker | Done | `db` and `backend` services exist and start |
| PostgreSQL | Done | Docker Compose PostgreSQL service exists and is healthy |
| Logging | Done | Console logging includes level, timestamp, logger/module, and message |
| API errors | Done | DRF errors are wrapped as `success: false` with code, message, and details |

## Frontend Status Table

| Area | Status | Notes |
|---|---|---|
| Next.js setup | Done | App Router project exists in `web/` |
| TypeScript | Done | TypeScript config exists |
| Tailwind | Done | Tailwind setup exists through Next scaffold |
| Folder structure | Done | Requested app/components/features/lib/hooks/types/config folders exist |
| Components | Done | Requested reusable components exist |
| Pages | Done | Public, auth, creator, brand, and admin pages exist |
| API client | Done | Axios client exists in `web/src/lib/api/client.ts` |
| API errors | Done | API errors normalize network, backend, and validation responses |
| React Query | In progress | Provider exists; campaign CRUD and creator applications use it; other marketplace screens still need migration |
| Zustand auth | Done | Store handles sign in, sign up, tokens, `/auth/me/`, initialization, `isAuthenticated`, and logout |
| Auth UI | Done | Login/register call live backend auth, load `/auth/me/`, update global user state, and redirect by role |
| Navbar auth state | Done | Navbar shows Sign in/Get started when signed out and user/Dashboard/Sign out when signed in |
| Dashboard auth state | Done | Brand, creator, and admin dashboards show live authenticated user name/email and role context |
| Toasts | Done | Sonner global toaster and toast helper are configured |
| Campaign UI | Done | Public list/detail and brand list/create/detail/edit are wired to live backend campaign endpoints |
| Application UI | In progress | Creator apply and creator applications list are live; brand approval/rejection is not wired yet |
| Brand UI | In progress | Pages exist; applications/submissions/payments still need live action wiring |
| Creator UI | In progress | Campaign browse/apply and applications are live; submissions/payments still use static sample data |
| Mobile-first layout | Done | `ScreenContainer`, bottom nav, and compact app-style pages exist |
| PWA-ready structure | In progress | Manifest/icon exist; no service worker/offline strategy yet |

## Mobile Status Table

| Area | Status | Notes |
|---|---|---|
| Expo setup | Done | `mobile/` was scaffolded with Expo React Native and TypeScript |
| Expo Router | Done | Route groups exist for auth, brand, creator, and admin |
| API client | Done | Axios client reads `EXPO_PUBLIC_API_BASE_URL` and avoids double `/api` paths |
| Token storage | Done | Access and refresh tokens are stored with Expo SecureStore |
| React Query | Done | Query client exists with conservative retry/stale defaults |
| Zustand auth | Done | Store handles sign in, sign up, auth hydration, logout, and role state |
| Auth UI | Done | Login/register call live Django auth endpoints |
| Role redirects | Done | Brand, creator, and admin users route to their dashboard areas |
| Dashboards | Done | Role dashboards show live authenticated user context and sign out |
| Toasts | Done | Mobile uses `react-native-toast-message` |
| Campaign CRUD | Not started | Mobile campaign screens are intentionally deferred |
| Creator apply flow | Not started | Mobile campaign browse/apply is intentionally deferred |

## Known Warnings and Fixes

- `InsecureKeyLengthWarning` from JWT signing is fixed for development startup. Missing or short `SECRET_KEY` values now produce a clear Connect warning and a generated process-local development key instead of using the old short fallback.
- A stable `SECRET_KEY` should still be set in `backend/.env` so JWT tokens remain valid across backend restarts.
- `DEBUG=True` logs a clear development-mode warning at backend startup.
- Missing `DATABASE_URL` now raises a clear configuration error instead of silently falling back.
- Empty `CORS_ALLOWED_ORIGINS` in development logs a clear warning.

## Demo Users For Local Testing

Run from `backend/`:

```bash
python manage.py seed_demo_users
```

Or with Docker from the project root:

```bash
docker compose exec backend python manage.py seed_demo_users
```

Local-only credentials:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@connect.test` | `ConnectDemo123!` |
| Brand | `brand@connect.test` | `ConnectDemo123!` |
| Creator | `creator@connect.test` | `ConnectDemo123!` |

The command refuses to run when `DEBUG=False`.

## MVP Flow Status

| Flow Step | Backend | Frontend | Notes |
|---|---|---|---|
| Register/login | Done | Done | Backend endpoints exist; web and mobile auth stores save tokens, hydrate `/auth/me/`, update dashboard state, and redirect by role |
| Create brand profile | In progress | In progress | Backend route and frontend helper paths are aligned; live UI behavior needs testing |
| Create creator profile | In progress | In progress | Backend route and frontend helper paths are aligned; live UI behavior needs testing |
| Create campaign | Done | Done | Backend CRUD exists; brand create/edit/detail pages use live React Query mutations and queries |
| Browse campaigns | Done | Done | Backend list exists; public and brand campaign lists use live React Query data |
| Apply to campaign | Done | Done | Creator campaign detail posts applications, shows existing status, and prevents duplicate applications |
| Approve application | In progress | Not started | Backend status update exists; frontend action UI not wired |
| Submit content | In progress | In progress | Backend service/view exists; frontend helper exists; UI upload flow incomplete |
| Approve/request revision | In progress | Not started | Backend status update exists; frontend action UI not wired |
| Track payment | In progress | In progress | Backend payment model/list/update exists; frontend page is static |

## Bugs / Issues Found

- `.env` currently contains `SECRET_KEY=` with no value. Development now uses a generated process-local key and logs a clear warning; production must use a real stable secret.
- API route double-prefixing was fixed. Current resolved paths include `/api/campaigns/`, `/api/brand/profile/`, `/api/creator/profile/`, and `/api/payments/`.
- Frontend API helpers already use the intended clean paths.
- Sign-in previously did not visibly change the UI because the navbar and dashboards were static. This is fixed by reading the Zustand auth store in the navbar and role dashboards.
- Campaign pages previously used sample fallback data. Public campaign list/detail and brand campaign CRUD now use live backend data only.
- Creator applications previously used static data. The creator applications page now uses live backend data.
- Mobile app has auth and role dashboards only. Mobile campaign CRUD and apply flows are not implemented yet.
- `web/.env.local` was not observed; only `web/.env.example` exists.
- `backend/.env copy.example` was referenced in the IDE but was not found in the project tree during inspection.
- No automated tests are present yet.

## Recommended Next Steps

1. Confirm `backend/.env` has a real development `SECRET_KEY`.
2. Browser-test campaign CRUD as a brand from create -> detail -> edit.
3. Browser-test creator campaign browse/apply and duplicate application states.
4. Wire brand and creator profile pages to live API data on web.
5. Build brand application approval/rejection UI on web.
6. Build creator content submission UI on web.
7. Build brand content approval/revision UI on web.
8. Build manual payment status update UI on web.
9. Add mobile campaign browse and campaign management screens.
10. Test the full MVP path end to end.
