## Completed So Far

### Root Setup

* [x] Monorepo structure exists with `web/`, `mobile/`, and `backend/`
* [x] Root `docker-compose.yml` exists
* [x] Root `.gitignore` exists
* [x] Root README exists
* [x] `docs/` project documentation folder exists

### Backend Setup

* [x] Django project exists under `backend/`
* [x] Settings are split into `base.py`, `development.py`, and `production.py`
* [x] DRF is installed and configured
* [x] CORS is installed and configured
* [x] SimpleJWT is installed and configured
* [x] drf-spectacular is installed and configured
* [x] Health endpoint exists
* [x] All expected app folders exist
* [x] Main marketplace models exist
* [x] Serializers exist
* [x] Views exist
* [x] App URL files exist
* [x] Admin registrations exist
* [x] Initial migrations exist
* [x] `python manage.py check` passes
* [x] Environment helpers exist for strings, booleans, and comma-separated lists
* [x] Backend console logging is configured for readable Docker logs
* [x] DRF API errors use a consistent response shape
* [x] Missing or short development `SECRET_KEY` values no longer trigger the SimpleJWT key-length warning

### Frontend Setup

* [x] Next.js App Router app exists under `web/`
* [x] TypeScript is configured
* [x] Tailwind CSS is configured
* [x] ESLint is configured
* [x] Mobile-first route groups exist
* [x] Reusable UI/layout components exist
* [x] API client exists
* [x] Token storage abstraction exists
* [x] Zustand auth store exists
* [x] React Query provider exists
* [x] Public, auth, creator, brand, and admin pages exist
* [x] Frontend auth is wired to live backend auth endpoints
* [x] Protected route behavior exists for brand, creator, and admin areas
* [x] Frontend API errors are normalized into a user-friendly shape
* [x] App-level loading, not-found, and error screens exist
* [x] Navbar/header reacts to authenticated state and shows Sign out
* [x] Brand, creator, and admin dashboards show live authenticated user context
* [x] Campaign list/detail/create/edit screens use live backend data through React Query
* [x] Creator campaign browse, detail, apply, and applications pages use live backend data
* [x] Sonner is configured for global toast notifications
* [x] `npm run lint` passes

### Mobile Setup

* [x] Expo React Native app exists under `mobile/`
* [x] Expo Router is configured
* [x] TypeScript is configured
* [x] React Query is configured
* [x] Zustand auth store exists
* [x] JWT tokens are stored with Expo SecureStore
* [x] Mobile API client connects to the existing Django API
* [x] Mobile login/register use live backend auth endpoints
* [x] Mobile register includes backend-required `full_name`
* [x] Mobile auth loads the current user from `/api/auth/me/`
* [x] Mobile role redirects exist for brand, creator, and admin users
* [x] Mobile route protection blocks unauthenticated access to protected app routes
* [x] Mobile logout clears tokens/auth state and redirects back to auth
* [x] Mobile toast notifications are configured with `react-native-toast-message`
* [x] `npm run lint` passes in `mobile/`
* [x] `npx tsc --noEmit` passes in `mobile/`

### Mobile Creator Flow

* [x] Creator dashboard screen exists
* [x] Creator campaign browse screen exists
* [x] Creator campaign detail screen exists
* [x] Creator campaign browse uses live backend campaign data
* [x] Creator campaign cards navigate using real campaign UUIDs
* [x] Creator campaign detail uses live backend campaign detail data
* [x] Creator apply button posts to the live backend using the real campaign UUID
* [x] Apply flow handles loading, success, duplicate application, closed campaign, authentication, and backend error states
* [x] Successful applications invalidate the application list cache
* [x] My Applications screen uses live backend data
* [x] My Applications shows real pending, approved, and rejected application statuses
* [x] My Applications shows nested campaign and brand data when returned by the backend
* [x] My Applications has loading, empty, error, retry, and pull-to-refresh states
* [x] Static application fixtures and fake submission navigation were removed from the live applications flow
* [ ] Only the first paginated page of creator applications is currently displayed
* [ ] Creator content submission flow still needs live backend wiring
* [ ] Creator submissions and payments still need live backend wiring

### Mobile Brand Flow

* [x] Brand dashboard prototype exists
* [x] Brand campaign creation/details prototype screens exist
* [x] Brand creator discovery/profile prototype screens exist
* [x] Brand messages, notifications, and profile screens exist
* [ ] Brand campaign list/detail screens still need live backend wiring on mobile
* [ ] Brand application review needs live backend wiring on mobile
* [ ] Brand approve/reject application actions need live backend wiring on mobile
* [ ] Brand content approval/revision flow needs live backend wiring on mobile
* [ ] Brand payment tracking UI needs live backend wiring on mobile

### Mobile UI Prototype

The Expo mobile app has a clickable UI prototype for the main creator, brand, and admin marketplace flows. Auth, creator campaign browsing/detail, creator apply, and creator My Applications are now connected to live backend data. Some remaining brand, submission, payment, notification, messaging, and profile screens are still prototype-first and may use mock data until their API wiring is completed.

* [x] Welcome/onboarding screen exists
* [x] Create account and role selection screen exists
* [x] Existing Lottie animation is used from `mobile/assets/lottie/toogle.json`
* [x] Real login screen exists
* [x] Real registration flow exists
* [x] Logout option exists
* [x] Creator setup placeholder exists
* [x] Brand setup placeholder exists
* [x] Creator dashboard prototype exists
* [x] Creator browse campaigns screen exists and uses live data
* [x] Creator campaign detail screen exists and uses live data
* [x] Creator apply flow posts to the backend
* [x] My Applications screen exists and uses live data
* [x] Submit content prototype screen exists
* [x] Content approval chat prototype exists
* [x] Brand dashboard prototype exists
* [x] New campaign prototype exists
* [x] Campaign details/applicants prototype exists
* [x] Find creators/discovery prototype exists
* [x] Creator profile detail prototype exists
* [x] Notification center prototype exists
* [x] Shared profile/settings prototype exists
* [x] Admin control center prototype exists
* [x] Prototype navigation links connect the creator, brand, and admin flows

## Still To Do

* [ ] Browser-test campaign CRUD as brand from create -> detail -> edit
* [ ] Browser-test creator campaign browse/apply and duplicate application states
* [ ] Test mobile auth on physical device, simulator, and Expo Go
* [ ] Test mobile creator campaign browse/detail/apply end-to-end against local backend
* [ ] Add pagination or infinite scroll for mobile creator applications
* [ ] Connect mobile brand campaign list/detail to live backend data
* [ ] Complete mobile brand application approval/rejection UI wiring
* [ ] Complete mobile creator content submission UI wiring
* [ ] Complete mobile brand content approval/revision UI wiring
* [ ] Complete mobile manual payment tracking UI wiring
* [ ] Connect mobile notifications to live backend data
* [ ] Connect mobile profile setup/edit screens to live backend profile APIs
* [ ] Add a full happy-path MVP test flow across web, mobile, and backend
* [ ] Expand user-friendly error/loading/empty states across marketplace pages
* [ ] Decide if disputes need a dedicated model or will remain manual admin notes for MVP
* [ ] Set a real non-empty `SECRET_KEY` in `backend/.env`

## Creator Flow

* [x] Creator profile model exists
* [x] Creator profile API view exists
* [x] Creator dashboard/profile/applications/submissions/payments pages exist
* [x] Creator campaign browse and detail pages use live campaign data on web
* [x] Creator apply flow posts to the live backend on web
* [x] Creator applications page uses live backend data on web
* [x] Mobile creator campaign browse uses live backend campaign data
* [x] Mobile creator campaign detail uses live backend campaign detail data
* [x] Mobile creator apply flow posts to the live backend
* [x] Mobile creator My Applications screen uses live backend data
* [ ] Creator submissions/payments still use static sample data in some UI areas
* [ ] Creator content submission flow needs end-to-end UI wiring

## Brand Flow

* [x] Brand profile model exists
* [x] Brand profile API view exists
* [x] Brand dashboard/profile/campaigns/applications/submissions/payments pages exist
* [x] Brand campaign management exists on web
* [ ] Brand pages still use static sample marketplace data in some areas outside live auth/campaign context
* [ ] Mobile brand campaign management still needs live backend wiring
* [ ] Brand application approval/rejection UI wiring needs completion
* [ ] Brand approval/revision/payment actions need end-to-end UI wiring

## API Flow

The intended frontend API flow is:

1. Auth screens call register, token, refresh, and me endpoints.
2. Profile screens call brand or creator profile endpoints.
3. Campaign screens list, create, and update campaigns.
4. Creator browses open campaigns and applies to a campaign.
5. Brand updates application status.
6. Creator submits content after approval.
7. Brand updates submission status.
8. Payment record is tracked manually after approved content.

Campaign and creator application flows are now live on the web app and partially live on the mobile app:

* Public campaign browsing calls `GET /api/campaigns/`.
* Public campaign detail calls `GET /api/campaigns/:id/`.
* Brand campaign management calls `GET /api/campaigns/?mine=true`.
* Brand campaign creation calls `POST /api/campaigns/`.
* Brand campaign editing calls `PATCH /api/campaigns/:id/`.
* Creator campaign browsing calls `GET /api/campaigns/`.
* Creator campaign detail calls `GET /api/campaigns/:id/`.
* Creator application status checks call `GET /api/creator/applications/`.
* Creator apply calls `POST /api/campaigns/:id/apply/`.
* Mobile auth calls `POST /api/auth/register/`, `POST /api/auth/token/`, `POST /api/auth/token/refresh/`, and `GET /api/auth/me/`.
* Mobile creator campaign browse calls `GET /api/campaigns/`.
* Mobile creator campaign detail calls `GET /api/campaigns/:id/`.
* Mobile creator apply calls `POST /api/campaigns/:id/apply/`.
* Mobile creator My Applications calls `GET /api/creator/applications/`.

## Testing Mobile Locally

Run the Expo app:

```bash
cd mobile
npm install
npx expo start
```

For physical phone testing, make sure the backend is reachable from the phone. Do not use `localhost` for a physical device.

Start Django so it listens on all interfaces:

```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```

Set the mobile API base URL in `mobile/.env`:

```bash
EXPO_PUBLIC_API_BASE_URL=http://YOUR_COMPUTER_LAN_IP:8000/api
```

Then restart Expo after changing `.env`:

```bash
cd mobile
npx expo start --lan --clear
```

Main mobile flows to test:

1. Welcome -> Create Account -> register as Creator or Brand.
2. Sign In -> login with demo Creator, Brand, or Admin.
3. Confirm protected routes cannot be opened while signed out.
4. Confirm Logout clears the session and returns to auth.
5. Creator Dashboard -> Browse Campaigns.
6. Browse Campaigns -> Campaign Detail using a real campaign UUID.
7. Campaign Detail -> Apply.
8. My Applications -> confirm the real application appears with pending/approved/rejected status.
9. Bell icon -> Notifications prototype.
10. Profile tab/link -> Profile/Settings prototype.

Remaining prototype-first flows to test visually:

1. Creator Setup.
2. Submit Content.
3. Content Approval Chat.
4. Brand Dashboard.
5. Brand New Campaign.
6. Brand Campaign Details/Applicants.
7. Brand Find Creators.
8. Admin Control Center.

## Testing Auth Locally

1. Start the backend and web or mobile app.
2. Register or log in from the auth screens.
3. Confirm `/api/auth/me/` returns `200` with the current user.
4. Confirm the web navbar or mobile app changes to the authenticated state.
5. Confirm the role dashboard shows the authenticated user context where available.
6. Click or tap Sign out / Logout.
7. Confirm access and refresh tokens are removed from localStorage on web or SecureStore on mobile.
8. Confirm the app returns to the signed-out state.
9. Confirm protected routes cannot be accessed after logout.

## Testing Creator Apply Flow Locally

1. Start backend.
2. Seed demo users:

```bash
cd backend
python manage.py seed_demo_users
```

3. Start mobile:

```bash
cd mobile
npx expo start --lan --clear
```

4. Log in as the creator demo user:

```text
creator@connect.test
ConnectDemo123!
```

5. Open Browse Campaigns.
6. Tap a campaign.
7. Tap Apply.
8. Confirm success state.
9. Open My Applications.
10. Confirm the real application appears.
11. Try applying to the same campaign again.
12. Confirm the duplicate application error is handled cleanly.

## Development Notes

* The web app remains the most complete live-data frontend.
* The Expo mobile app now has real backend auth, logout, role redirects, creator campaign browsing/detail, creator apply, and creator My Applications.
* Mobile brand campaign management and application review are the next major live-data mobile flows.
* Some mobile screens are still prototype-first and use mock data until their API wiring is completed.
* Stripe is not included yet.
* Celery/Redis is not included yet.
* AI matching is not included yet.
* Payment is manual tracking for MVP.
* Local media storage is used first; S3 or Cloudflare R2 can be added later.
* Sonner is used for global web toast notifications.
* `react-native-toast-message` is used for global mobile toast notifications.

## Next Development Steps

1. Connect mobile brand campaign list/detail to live backend data.
2. Connect mobile brand application review to live backend data.
3. Add mobile brand approve/reject application actions.
4. Test creator application status update after brand approval/rejection.
5. Connect mobile creator content submission flow after application approval.
6. Connect mobile brand content approval/revision flow.
7. Connect mobile manual payment tracking UI.
8. Connect mobile notifications and profile setup/edit screens.
9. Add pagination or infinite scroll for mobile creator applications and campaigns.
10. Test the full MVP flow across web, mobile, and backend.
