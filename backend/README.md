# Tasteful Table Backend

NestJS backend for the customer `frontend` app and the restaurant `admin` dashboard.

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Passport.js
- Swagger
- BullMQ
- Redis
- Cloudinary
- Stripe / ToyyibPay

## Folder Structure

```text
src/
  common/
    decorators/      Shared decorators like CurrentUser and Roles
    guards/          JWT and role guards
    types/           Shared backend types
  modules/
    auth/            Login, JWT, Passport strategies
    customers/       Admin customer management
    health/          Health check endpoint
    menu/            Public and admin menu APIs
    orders/          Admin order management
    payments/        Stripe / ToyyibPay integration
    promotions/      Promo codes, rewards, loyalty
    reports/         Admin reporting endpoints
    reservations/    Booking and seating APIs
    settings/        Admin restaurant/system settings
    uploads/         Cloudinary uploads
  prisma/            Prisma service/module
  queues/            BullMQ / Redis queue setup
```

## Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```bash
copy .env.example .env
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npm run prisma:migrate
```

Start development server:

```bash
npm run start:dev
```

API base URL:

```text
http://localhost:4000/api
```

Swagger docs:

```text
http://localhost:4000/api/docs
```

Health check:

```text
GET http://localhost:4000/api/health
```

## Next Implementation Order

1. Auth: real password checking, JWT issuing, refresh token flow.
2. Prisma schema: finish models for orders, order items, payments, customers, promotions, settings.
3. Menu module: CRUD menu categories/items.
4. Orders module: create order from frontend, manage order status from admin.
5. Reservations module: create reservation from frontend, manage reservations from admin.
6. Uploads module: Cloudinary menu image uploads.
7. Payments module: Stripe / ToyyibPay checkout and webhooks.
8. Reports module: calculate dashboard/report metrics from database.
9. Settings module: store restaurant configuration.

