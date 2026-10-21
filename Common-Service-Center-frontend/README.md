# CSC Portal — React Frontend

A responsive React/Vite frontend refresh for the Common Service Center Spring Boot + Maven project. It uses React Router, Tailwind CSS v4, Lucide icons, and a custom design system for a clean SaaS-style workspace.

## Included screens

- Overview dashboard with stats, recent appointments, quick actions, and activity summary
- Service catalogue with search and API-backed service loading
- Appointment booking form with client-side validation and Spring Boot API integration
- Admin service catalogue view with delete action
- Login and registration screens wired to API request helpers
- User management preview page (connect to a real admin users endpoint before production)
- Responsive collapsible sidebar, mobile drawer, breadcrumbs, profile menu, and toast notifications

## Run locally

Requirements: Node.js 20.19+ (recommended for current Vite releases) and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

The frontend runs on the Vite development server (usually `http://localhost:5173`). Set `VITE_API_BASE_URL=http://localhost:8080` in `.env` if Spring Boot is running on port 8080.

## Backend endpoints currently used

| Purpose | Method | Endpoint |
|---|---|---|
| List services | GET | `/api/services` |
| Add service | POST | `/admin/services` |
| Delete service | DELETE | `/admin/services/{id}` |
| Book appointment | POST | `/api/appointments/book` |
| Register | POST | `/api/users/register` |
| Login | POST | `/api/users/login` |

The service list falls back to sample display data if the backend is offline. Booking/auth actions show an error message when the API request fails. The sample dashboard appointment rows and user-management screen are UI preview data, not fetched from the backend.

## Important Spring Security integration notes

1. Configure CORS to allow the Vite origin during development, and credentials if using session-based login.
2. The current `apiRequest` helper sends `credentials: 'include'`. For session-based Spring Security, obtain and send the CSRF token for state-changing requests according to your backend configuration. The Thymeleaf CSRF meta tags from the old templates do not automatically exist in a React app.
3. The endpoints above are based on the supplied templates. Adjust request payloads and endpoint paths to match the actual controller DTOs.
4. The login/register forms currently post JSON. If your Spring Security login is configured for standard form-urlencoded login at `/login`, add an adapter or update the login flow to match it.
5. Replace demo dashboard metrics, appointment rows, and sample user records with secured backend API data before production use.

## Production build

```bash
npm run build
npm run preview
```

The generated static site is in `dist/`. Configure your hosting server to rewrite application routes to `index.html` for React Router history navigation.
