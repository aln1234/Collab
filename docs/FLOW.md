# Connect Product Flow

## Core Marketplace Loop

Brand creates campaign -> creator applies -> brand approves -> creator submits content -> brand reviews -> brand approves or requests revision -> payment status is updated manually.

## User Roles

### Creator

Creators browse available campaigns, apply to campaigns that fit their niche, submit content after approval, and track content/payment status.

### Brand

Brands create company profiles, publish campaigns, review creator applications, review submitted content, approve content or request revisions, and manually update payment status.

### Admin

Admins use Django Admin for internal operations. They can manage users, marketplace records, payment records, notifications, and manual disputes/issues.

## Auth Flow

Register or login follows this flow on web and mobile:

1. User submits credentials from the client app.
2. The client calls `POST /api/auth/register/` for registration or `POST /api/auth/token/` for login.
3. Access and refresh JWT tokens are saved through the token storage helper.
   - Web uses the localStorage-backed token abstraction for the MVP.
   - Mobile uses Expo SecureStore.
4. The auth store calls `GET /api/auth/me/` with `Authorization: Bearer <access>`.
5. The returned user is saved in the Zustand auth store.
6. The user is redirected by role:
   - `BRAND` -> `/brand/dashboard` on web or `/(brand)/dashboard` on mobile
   - `CREATOR` -> `/creator/dashboard` on web or `/(creator)/dashboard` on mobile
   - `ADMIN` -> `/admin` on web or `/(admin)` on mobile
7. Navigation, protected routes, and dashboards update from the auth store.

Existing-token startup follows the same read path: stored access token -> `/api/auth/me/` -> save user or clear invalid tokens.

Logout follows this flow:

1. User clicks Sign out.
2. Access and refresh tokens are cleared.
3. Zustand auth state resets to signed out.
4. The active client shows a `Signed out` toast.
5. The user is redirected to the login screen.

## Client Apps

### Web

The web app under `web/` is the most complete frontend. It includes live auth, role dashboards, campaign CRUD, creator campaign browsing, creator apply, and creator applications.

### Mobile

The mobile app under `mobile/` is an Expo React Native client that reuses the same Django API. It currently includes live auth, SecureStore token persistence, role redirects, and simple brand/creator/admin dashboards. Mobile campaign CRUD and creator apply flows are intentionally not implemented yet.

## Creator Journey

1. Creator registers or logs in.
2. Creator is redirected to the creator dashboard.
3. Creator creates or updates a creator profile with display name, bio, niche, location, social links, and image.
4. Creator browses open campaigns.
5. Creator opens a campaign detail page and reviews deliverables, budget, and deadline.
6. Creator applies with a message.
7. Creator waits for the brand to approve or reject the application.
8. If approved, creator submits content for the campaign.
9. Creator tracks whether content is approved or needs revision.
10. Creator tracks manual payment status after content is approved.

## Brand Journey

1. Brand registers or logs in.
2. Brand is redirected to the brand dashboard.
3. Brand creates or updates a company profile with name, website, industry, description, and logo.
4. Brand creates a campaign with title, description, budget, currency, status, deliverables, and deadline.
5. Brand reviews creator applications.
6. Brand approves or rejects creators.
7. Brand reviews content submitted by approved creators.
8. Brand approves content or requests a revision with feedback.
9. Brand tracks and updates payment status manually.

## Admin Journey

1. Admin logs into Django Admin.
2. Admin manages user accounts and roles.
3. Admin reviews or edits brand and creator profiles.
4. Admin manages campaign records.
5. Admin manages campaign applications.
6. Admin manages content submissions.
7. Admin manages manual payment records.
8. Admin handles disputes/issues manually through admin records and notes.

## Data Model Flow

```text
User
  -> BrandProfile
    -> Campaign
      -> CampaignApplication
      -> ContentSubmission
      -> PaymentRecord

User
  -> CreatorProfile
    -> CampaignApplication
    -> ContentSubmission
    -> PaymentRecord

User
  -> Notification
```

Model relationships:

- `User` is the authentication identity and has a role: `BRAND`, `CREATOR`, or `ADMIN`.
- `BrandProfile` belongs to a brand user.
- `CreatorProfile` belongs to a creator user.
- `Campaign` belongs to a `BrandProfile`.
- `CampaignApplication` connects a `CreatorProfile` to a `Campaign`.
- `ContentSubmission` connects approved creator work to a `Campaign`.
- `PaymentRecord` tracks manual payment status for a creator and campaign.
- `Notification` belongs to a user and can later support in-app or push notification flows.

## API Flow

Intended screen-to-endpoint flow:

| Screen / Action | Intended Backend Endpoint |
|---|---|
| Register | `POST /api/auth/register/` |
| Login | `POST /api/auth/token/` |
| Refresh token | `POST /api/auth/token/refresh/` |
| Load current user | `GET /api/auth/me/` |
| Brand profile | `GET/PUT /api/brand/profile/` |
| Creator profile | `GET/PUT /api/creator/profile/` |
| Browse campaigns | `GET /api/campaigns/` |
| Create campaign | `POST /api/campaigns/` |
| Campaign detail | `GET /api/campaigns/:id/` |
| Update campaign | `PATCH /api/campaigns/:id/` |
| Apply to campaign | `POST /api/campaigns/:id/apply/` |
| Creator applications | `GET /api/creator/applications/` |
| Brand applications | `GET /api/brand/applications/` |
| Update application status | `PATCH /api/applications/:id/status/` |
| Submit content | `POST /api/campaigns/:id/submissions/` |
| Creator submissions | `GET /api/creator/submissions/` |
| Brand submissions | `GET /api/brand/submissions/` |
| Update submission status | `PATCH /api/submissions/:id/status/` |
| Payments | `GET /api/payments/` |
| Update payment status | `PATCH /api/payments/:id/status/` |
| Notifications | `GET /api/notifications/` |
| Mark notification read | `PATCH /api/notifications/:id/read/` |

Current note: backend routes are aligned with these intended clean API paths. See `docs/PROJECT_STATUS.md` for remaining frontend wiring status.

## Future Flow Additions

- Stripe Connect for real payment processing
- Push notifications
- Deeper mobile marketplace flows
- AI campaign matching
- Brand/creator chat
- Analytics dashboards
- S3 or Cloudflare R2 media storage
- More advanced creator discovery and filtering
