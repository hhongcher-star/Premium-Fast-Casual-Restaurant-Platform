# Frontend / Admin / Backend Connection Manual

This project has two separate React apps:

- `frontend`: customer-facing website/app
- `admin`: restaurant management dashboard

Both apps should connect to the same backend API.

## Recommended Architecture

```text
tasteful-table/
  frontend/      Customer app
  admin/         Admin dashboard
  backend/       API server, database, auth, business logic
  docs/          Project manuals
```

The backend is not in this repo yet. Create it as a separate folder named `backend`.

## How The Apps Connect

```text
frontend  --->  backend API  ---> database
admin     --->  backend API  ---> database
```

The customer app and admin app should never read/write the database directly. They should only call backend endpoints.

## Environment Variables

Create this in `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

Create this in `admin/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

In production, change the URL:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## Shared API Client Pattern

Use the same pattern in both apps.

Create this file in each app:

```text
frontend/src/lib/api.ts
admin/src/lib/api.ts
```

Example:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
```

## Auth Flow

Use role-based login.

Recommended roles:

- `customer`
- `staff`
- `manager`
- `admin`

Frontend login:

```text
POST /api/auth/customer/login
```

Admin login:

```text
POST /api/auth/admin/login
```

Backend returns:

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "u_123",
    "name": "Tiago M.",
    "role": "admin"
  }
}
```

Admin routes should require `manager` or `admin`.

## Backend CORS

Backend must allow both apps:

```text
http://localhost:5173  frontend dev
http://localhost:5174  admin dev
```

Example allowed origins:

```ts
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://yourdomain.com",
  "https://admin.yourdomain.com",
];
```

## Suggested Backend Modules

```text
backend/src/
  modules/
    auth/
    users/
    customers/
    menu/
    orders/
    reservations/
    promotions/
    reports/
    settings/
  middleware/
    auth.ts
    roles.ts
  db/
    schema.ts
  server.ts
```

## API Endpoint Map

### Public / Frontend APIs

| Feature | Method | Endpoint |
|---|---:|---|
| Get menu categories | GET | `/api/menu/categories` |
| Get menu items | GET | `/api/menu/items` |
| Get item detail | GET | `/api/menu/items/:id` |
| Create cart checkout | POST | `/api/checkout` |
| Create reservation | POST | `/api/reservations` |
| Track order | GET | `/api/orders/:id/track` |
| Customer login | POST | `/api/auth/customer/login` |
| Customer profile | GET | `/api/me` |
| Rewards profile | GET | `/api/me/rewards` |

### Admin APIs

| Feature | Method | Endpoint |
|---|---:|---|
| Admin login | POST | `/api/auth/admin/login` |
| Dashboard summary | GET | `/api/admin/dashboard` |
| Menu list | GET | `/api/admin/menu/items` |
| Create menu item | POST | `/api/admin/menu/items` |
| Update menu item | PATCH | `/api/admin/menu/items/:id` |
| Delete menu item | DELETE | `/api/admin/menu/items/:id` |
| Orders list | GET | `/api/admin/orders` |
| Order detail | GET | `/api/admin/orders/:id` |
| Update order status | PATCH | `/api/admin/orders/:id/status` |
| Reservations list | GET | `/api/admin/reservations` |
| Update reservation | PATCH | `/api/admin/reservations/:id` |
| Promotions list | GET | `/api/admin/promotions` |
| Customers list | GET | `/api/admin/customers` |
| Reports summary | GET | `/api/admin/reports/summary` |
| Settings | GET | `/api/admin/settings` |
| Update settings | PATCH | `/api/admin/settings` |

## Example Admin API Usage

Menu manager:

```ts
import { apiFetch } from "@/lib/api";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "active" | "inactive";
};

export function getMenuItems() {
  return apiFetch<MenuItem[]>("/admin/menu/items", { auth: true });
}
```

Order status update:

```ts
export function updateOrderStatus(orderId: string, status: string) {
  return apiFetch(`/admin/orders/${orderId}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status }),
  });
}
```

## Data Ownership

Use the backend as the single source of truth.

- `frontend` creates customer orders and reservations.
- `admin` manages those same orders and reservations.
- Backend stores and validates everything.
- Reports are calculated by backend, not manually inside the UI.

## Development Commands

Run customer frontend:

```bash
cd frontend
npm.cmd run dev
```

Run admin:

```bash
cd admin
npm.cmd run dev -- --port 5174
```

Run backend, after it exists:

```bash
cd backend
npm.cmd run dev
```

## Recommended Local Ports

| App | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Admin | `http://localhost:5174` |
| Backend API | `http://localhost:4000/api` |

## Important Rules

- Do not duplicate business logic in `frontend` and `admin`.
- Put validation, permissions, payment checks, and status changes in backend.
- Admin-only endpoints must check JWT and role.
- Frontend should not call `/api/admin/*`.
- Admin should not use customer-only endpoints for management actions.
- Keep response shapes consistent so pages are easy to connect later.

## Backend Task Checklist

| Priority | Module | Task | Status |
|---:|---|---|---|
| 1 | Auth | Finish admin/customer login with bcrypt, JWT, role checks, and `/auth/me`. | Done |
| 1 | Prisma | Expand schema for menu items, orders, order items, reservations, customers, rewards, promotions, payments, and settings. | Done |
| 1 | Seed | Add seed data for admin account, customer account, menu categories, and sample menu items. | Done |
| 2 | Menu | Build admin CRUD APIs for categories and menu items. | Done |
| 2 | Menu | Build public menu APIs for frontend browsing. | Done |
| 2 | Uploads | Connect Cloudinary for menu item images. | Done |
| 3 | Orders | Build frontend checkout/create order API. | Todo |
| 3 | Orders | Build admin order list/detail/status update APIs. | Todo |
| 3 | Queue | Add BullMQ jobs for order notifications and email/SMS tasks. | Todo |
| 4 | Reservations | Build frontend create reservation API. | Todo |
| 4 | Reservations | Build admin reservation list/update/status APIs. | Todo |
| 4 | Reservations | Add table/floor-plan data model. | Todo |
| 5 | Customers | Build admin customer list/detail APIs. | Todo |
| 5 | Customers | Build customer profile and rewards APIs for frontend. | Todo |
| 6 | Promotions | Build promo code CRUD and validation logic. | Todo |
| 6 | Loyalty | Build points earning, redemption, and tier rules. | Todo |
| 7 | Payments | Connect Stripe checkout/payment intent flow. | Todo |
| 7 | Payments | Connect ToyyibPay payment flow. | Todo |
| 7 | Payments | Add payment webhooks and order payment status updates. | Todo |
| 8 | Reports | Build dashboard summary and reports aggregation endpoints. | Todo |
| 8 | Settings | Build restaurant/system settings read/update APIs. | Todo |
| 9 | Security | Add route guards to all `/admin/*` endpoints. | Partial - menu done |
| 9 | Docs | Complete Swagger DTOs and examples for every endpoint. | Partial - menu DTOs done |
| 10 | Integration | Connect `admin` UI to backend APIs. | Todo |
| 10 | Integration | Connect `frontend` UI to backend APIs. | Todo |
| 10 | Testing | Add unit/e2e tests for auth, orders, reservations, and payments. | Todo |
