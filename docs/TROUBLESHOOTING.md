# Troubleshooting

## Backend Does Not Start

Check the backend logs first:

```bash
docker compose logs backend --tail=100
```

Common causes:

- `DATABASE_URL` is missing or malformed.
- `SECRET_KEY` is missing in production or shorter than 32 characters.
- A migration failed before Gunicorn started.
- A Python package is missing because the backend image needs to be rebuilt.

Useful commands:

```bash
docker compose build backend
docker compose up backend
docker compose run --rm backend python manage.py check
```

## Database Connection Fails

Confirm Postgres is healthy:

```bash
docker compose ps
docker compose logs db --tail=100
```

The backend `.env` should point to the Compose database host:

```bash
DATABASE_URL=postgresql://connect_user:connect_password@db:5432/connect_db
```

If running Django directly on the host instead of Docker, use `localhost` instead of `db`.

## JWT InsecureKeyLengthWarning

`InsecureKeyLengthWarning` means the Django `SECRET_KEY` used for JWT signing is shorter than the recommended length.

Generate a secure key:

```bash
cd backend
python - << 'PY'
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
PY
```

Put the generated value in `backend/.env`:

```bash
SECRET_KEY=your-generated-secret-key
```

In development, Connect can start with a missing or short key by generating a process-local key and logging a warning. That keeps development moving, but tokens will not remain valid after backend restart until a stable key is set.

## Frontend Cannot Connect To Backend

Confirm the backend is running:

```bash
curl http://localhost:8000/api/health/
```

Confirm the web API URL is configured:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

If `NEXT_PUBLIC_API_URL` is missing in development, the web app falls back to `http://localhost:8000/api` and prints a console warning.

## Mobile App Cannot Connect To Backend

Confirm the backend is running:

```bash
curl http://localhost:8000/api/health/
```

Set the mobile API URL in `mobile/.env`:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Use the correct host for your simulator or device:

- iOS simulator may work with `http://localhost:8000/api`
- Android emulator usually needs `http://10.0.2.2:8000/api`
- Physical phones need your computer LAN IP, such as `http://192.168.x.x:8000/api`

Restart Expo after changing `.env` values.

## CORS Error

For local development, `backend/.env` should include:

```bash
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Restart the backend after changing CORS settings:

```bash
docker compose restart backend
```

## Migrations Fail

Run migrations directly so the error is isolated:

```bash
docker compose run --rm backend python manage.py migrate
```

Then inspect logs:

```bash
docker compose logs backend --tail=100
docker compose logs db --tail=100
```

Do not delete migration files or reset the database unless you intentionally want to discard local data.

## API Returns 401

Common causes:

- The access token expired.
- The token was signed with a previous development `SECRET_KEY`.
- The user is not logged in.
- The user is trying to access a role-protected area for the wrong role.

Try signing out and signing in again. If `SECRET_KEY` was changed or generated at startup, old tokens will be invalid.

## Login Succeeds But Navbar Does Not Change

Check these items in order:

1. Confirm `connect.accessToken` and `connect.refreshToken` exist in browser localStorage.
2. Confirm `GET /api/auth/me/` returns `200`.
3. Confirm the request includes `Authorization: Bearer <access>`.
4. Confirm the navbar/header is a client component.
5. Confirm the navbar/header reads from the Zustand auth store.
6. Confirm login/register uses the auth store `signIn` or `signUp` action instead of only saving tokens.

If `/api/auth/me/` returns `401`, sign out and sign in again. Tokens may have been signed with a previous development `SECRET_KEY`.

## Toast Issues

Connect uses Sonner for web toast notifications and `react-native-toast-message` for mobile toast notifications. If web toasts do not appear:

- Confirm the root app layout renders the global Sonner `Toaster`.
- Confirm client components call the toast helper in `web/src/lib/toast.ts`.
- Confirm the component has `"use client"` when it handles form submit, logout, or another browser event.
- Avoid firing both a helper toast and a direct `toast.*` call for the same action.

If mobile toasts do not appear:

- Confirm `app/_layout.tsx` renders the global `Toast` component.
- Confirm mobile actions call helpers from `mobile/src/lib/toast.ts`.

## How To Inspect Docker Logs

Use these commands from the project root:

```bash
docker compose logs backend --tail=100
docker compose logs web --tail=100
docker compose logs db --tail=100
```

Follow logs live:

```bash
docker compose logs -f backend
```
